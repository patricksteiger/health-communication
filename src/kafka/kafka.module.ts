import { DynamicModule, Global, Module } from '@nestjs/common';
import { KafkaConfig } from '../config/kafka.config';
import { KafkaService } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
  static register(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaService,
          useValue: new KafkaService(kafkaConfig),
        },
      ],
      exports: [KafkaService],
    };
  }
}
