// NestJS core imports for application bootstrap
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Application bootstrap function that initializes the NestJS server
 * Configures CORS for cross-origin requests and starts the server on the specified port
 */
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend requests from different origins
  app.enableCors();
  
  // Start the server on the specified port (defaults to 3000 if not set)
  await app.listen(process.env.PORT ?? 3000);
}

// Start the application
bootstrap();
