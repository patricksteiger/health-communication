import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ProducerModule } from './producer/producer.module';
import { KAFKA_MODULE_CONFIG } from './config/kafka.config';

@Module({
  imports: [
    KafkaModule.register(KAFKA_MODULE_CONFIG),
    ConsumerModule,
    ProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
