import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KAFKA_CONFIG, KAFKA_TOPIC } from './config/kafka.config';

@Controller()
export class AppController implements OnModuleInit {
  @Client(KAFKA_CONFIG)
  client: ClientKafka;

  private logger: Logger;

  constructor(private readonly appService: AppService) {
    this.logger = new Logger(this.constructor.name);
  }

  onModuleInit() {
    const requestPatterns = [KAFKA_TOPIC];
    requestPatterns.forEach((pattern) =>
      this.client.subscribeToResponseOf(pattern),
    );
  }

  @Get()
  getHello() {
    this.client.emit<string>(KAFKA_TOPIC, 'date: ' + new Date());
  }

  @EventPattern(KAFKA_TOPIC)
  async handleEntityCreated(payload: any) {
    this.logger.log(payload);
  }
}
