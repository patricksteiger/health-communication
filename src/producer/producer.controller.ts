import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  private logger: Logger;

  constructor(private readonly producerService: ProducerService) {
    this.logger = new Logger(this.constructor.name);
  }

  @Post(':topic')
  async sendMessage(@Param('topic') topic, @Body() body: any) {
    return await this.producerService.send(topic, body);
  }
}
