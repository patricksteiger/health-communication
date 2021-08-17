import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { kafkaConfig } from './config/kafka.config';

@Controller()
export class AppController implements OnModuleInit {
  @Client(kafkaConfig)
  client: ClientKafka;

  private logger: Logger;

  constructor(private readonly appService: AppService) {
    this.logger = new Logger(this.constructor.name);
  }

  onModuleInit() {
    const requestPatterns = ['entity-created'];
    requestPatterns.forEach((pattern) =>
      this.client.subscribeToResponseOf(pattern),
    );
  }

  @Get()
  getHello() {
    this.client.emit<string>('entity-created', 'date: ' + new Date());
  }

  @EventPattern('entity-created')
  async handleEntityCreated(payload: any) {
    this.logger.log(payload);
  }
}
