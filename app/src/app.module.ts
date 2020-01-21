import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { RedisModule } from 'nestjs-redis';

import { AppEnvironment } from '@app/common/enum/app-environment';
import { LoggerModule } from '@app/logger/logger.module';
import { ErrorsFilterModule } from '@app/errors-filter/errors-filter.module';
import { LoggerMiddleware } from '@app/logger/logger.middleware';
import { ConfigModule } from '@app/config/config.module';

const loggerTransports: Transport[] = [
  new DailyRotateFile({
    filename: 'cc-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '7d',
    dirname: process.env.LOGS_PATH,
  }),
];

if (process.env.NODE_ENV === AppEnvironment.DEVELOPMENT) {
  loggerTransports.push(new transports.Console());
}

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot({
      format: format.printf(info => info.message),
      transports: loggerTransports,
    }),
    LoggerModule,
    ErrorsFilterModule,
    ConfigModule,
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
