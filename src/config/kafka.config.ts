import { ClientOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ConsumerConfig } from 'kafkajs';

export const KAFKA_CONFIG: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
  },
};

export const KAFKA_MODULE_CONFIG = {
  clientId: 'test-app-client',
  brokers: ['localhost:9092'],
  groupId: 'hero-consumer-server',
}

export const CLIENT_CONFIG: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'hero-server',
      brokers: ['localhost:9092'],
    },
    //consumer: {
    //  groupId: 'hero-consumer-server',
    //},
  },
};

const CONSUMER_CFG: ConsumerConfig = {
  groupId: '',
};

export const KAFKA_TOPIC = 'Orders';

export class KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId: string;
}

export class KafkaPayload {
  public body: any;
  public messageId: string;
  public messageType: string;
  public topicName: string;
  public createdTime?: string;

  create?(messageId, body, messageType, topicName): KafkaPayload {
    return {
      messageId,
      body,
      messageType,
      topicName,
      createdTime: new Date().toISOString(),
    };
  }
}
