import { Inject } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import { LoggerService } from '@app/logger/logger.service';
import { SystemError } from '@app/system-error/system-error';

export class SystemErrorService {
  constructor(
    @Inject(serviceTokens.LoggerService)
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: SystemError): Promise<void> {
    await this.loggerService.notice('System error has been occurred', {
      extra: {
        systemError: {
          code: err.getSystemCode(),
          message: err.getMessage(),
          additionalData: err.getSystemAdditionalData(),
        },
      },
    });
  }
}
