import { Injectable, Logger } from '@nestjs/common';
import { RecordMetadata } from 'kafkajs';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class ProducerService {
  private logger: Logger;

  constructor(private readonly kafkaService: KafkaService) {
    this.logger = new Logger(this.constructor.name);
  }

  async send(topic: string, message: any): Promise<void | RecordMetadata[]> {
    const payload = KafkaService.generatePayload(topic, message);
    this.logger.log(`Sent: ${payload}`);
    const value = await this.kafkaService.sendMessage(topic, payload);
    this.logger.log('Answer received');
    return value;
  }
}
