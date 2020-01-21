import { Inject } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { serviceTokens } from '@app/common/service.tokens';
import { LoggerService } from '@app/logger/logger.service';

export class UniqueConstraintService {
  constructor(
    @Inject(serviceTokens.LoggerService)
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: Error): Promise<void> {
    await this.loggerService.warning('Unique constraint alert', {
      extra: {
        error: stringify(err),
      },
    });
  }
}
