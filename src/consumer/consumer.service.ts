import { Injectable, Logger } from '@nestjs/common';
import { KafkaPayload, KAFKA_TOPIC } from '../config/kafka.config';
import { SubscribeTo } from '../config/kafka.decorator';

@Injectable()
export class ConsumerService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
