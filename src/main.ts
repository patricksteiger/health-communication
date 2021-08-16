import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';

async function bootstrap() {
  const kafkaOptions: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
    },
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kafkaOptions,
  );
  app.listen();
}
bootstrap();
