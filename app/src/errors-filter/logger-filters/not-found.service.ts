import { Inject } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { serviceTokens } from '@app/common/service.tokens';
import { LoggerService } from '@app/logger/logger.service';

export class NotFoundService {
  constructor(
    @Inject(serviceTokens.LoggerService)
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: Error): Promise<void> {
    await this.loggerService.notice('Not found', {
      extra: {
        error: stringify(err),
      },
    });
  }
}
