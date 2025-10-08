import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for cross-origin clients (e.g., frontend on a different port)
  app.enableCors({
    origin: true, // Reflect request origin in dev; set specific origins in prod via options
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
}
bootstrap();
