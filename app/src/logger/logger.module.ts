import { Module } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import { LoggerService } from '@app/logger/logger.service';

@Module({
  providers: [{
    provide: serviceTokens.LoggerService,
    useClass: LoggerService,
  }],
  exports: [
    serviceTokens.LoggerService,
  ],
})
export class LoggerModule {}
