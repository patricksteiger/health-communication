import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const port = 3000;
  await app.listen(port, () => logger.log(`running on port ${port}`);
}
bootstrap();
