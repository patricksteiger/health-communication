import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  Admin,
  Consumer,
  ConsumerSubscribeTopic,
  Kafka,
  Producer,
} from 'kafkajs';
import { KafkaConfig, KafkaPayload, KAFKA_TOPIC } from '../config/kafka.config';
import {
  SUBSCRIBER_FN_REF_MAP,
  SUBSCRIBER_OBJ_REF_MAP,
} from '../config/kafka.decorator';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private logger: Logger;
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private admin: Admin;

  constructor(private readonly kafkaConfig: KafkaConfig) {
    this.kafka = new Kafka({
      clientId: this.kafkaConfig.clientId,
      brokers: this.kafkaConfig.brokers,
    });
    this.admin = this.kafka.admin();
    this.producer = this.kafka.producer();
    const consumerCfg = {
      groupId: this.kafkaConfig.groupId,
    };
    this.consumer = this.kafka.consumer(consumerCfg);
    this.logger = new Logger(this.constructor.name);
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
    await this.admin.connect();
    SUBSCRIBER_FN_REF_MAP.forEach(async (functionRef, topic) => {
      // attach the function with kafka topic name
      const subscribeOptions: ConsumerSubscribeTopic = {
        topic: KAFKA_TOPIC,
        fromBeginning: true,
      };
      await this.consumer.subscribe(subscribeOptions);
    });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const functionRef = SUBSCRIBER_FN_REF_MAP.get(topic);
        const object = SUBSCRIBER_OBJ_REF_MAP.get(topic);
        // bind the subscribed functions to topic
        await functionRef.apply(object, [message.value.toString()]);
      },
    });
  }

  async sendMessage(kafkaTopic: string, kafkaMessage: KafkaPayload) {
    await this.producer.connect();
    const metadata = await this.producer
      .send({
        topic: kafkaTopic,
        messages: [{ value: JSON.stringify(kafkaMessage) }],
      })
      .catch((e) => console.error(e.message, e));
    await this.producer.disconnect();
    return metadata;
  }

  async bindAllTopicToConsumer(callback, _topic) {
    await this.consumer.subscribe({ topic: _topic, fromBeginning: false });
  }

  static generatePayload(topic: string, body: any): KafkaPayload {
    return {
      body: body,
      topicName: topic,
      messageId: uuidv4(),
      messageType: 'test',
      createdTime: '' + new Date(),
    };
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
    await this.admin.disconnect();
  }
}
