import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [
    KafkaModule.register({
      clientId: 'test-app-client',
      brokers: ['localhost:9092'],
      groupId: 'test-app-group',
    }),
    ConsumerModule,
    ProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
