import { Controller, Logger } from '@nestjs/common';
import { KAFKA_TOPIC, KafkaPayload } from '../config/kafka.config';
import { SubscribeTo } from '../config/kafka.decorator';

@Controller('consumer')
export class ConsumerController {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  @SubscribeTo(KAFKA_TOPIC)
  async handleTopic(payload: KafkaPayload) {
    console.log(payload);
  }
}
