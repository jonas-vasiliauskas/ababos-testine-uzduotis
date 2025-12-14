import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Nebūtina, CORS jau daro NGINX
  // app.enableCors();

  await app.listen(3001);
}
bootstrap();
