// NestJS core modules for application configuration
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Feature modules for different business domains
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';

/**
 * Root application module that configures all dependencies and feature modules
 * Sets up database connection, environment variables, and imports business modules
 */
@Module({
  imports: [
    // Load environment variables globally across the application
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure TypeORM database connection using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, // Automatically load entity files
        synchronize: true, // Sync database schema with entities (development only)
      }),
    }),

    // Business feature modules
    ProductsModule,
    SuppliersModule,
    CategoriesModule,
  ],
})
export class AppModule {}
