import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { RecordMetadata } from 'kafkajs';
import { AppService } from './app.service';
import {
  CLIENT_CONFIG,
  KafkaPayload,
  KAFKA_TOPIC,
} from './config/kafka.config';
import { SubscribeTo } from './config/kafka.decorator';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  private logger: Logger;

  constructor(private readonly kafkaService: KafkaService) {
    this.logger = new Logger(this.constructor.name);
  }

  @Get()
  async getHello(): Promise<void | RecordMetadata[]> {
    const message = {
      value: 'Message send to Kakfa Topic',
    };
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: KAFKA_TOPIC,
    };
    this.logger.log('Sending message...');
    const value = await this.kafkaService.sendMessage(KAFKA_TOPIC, payload);
    this.logger.log('Answer received');
    return value;
  }
}
