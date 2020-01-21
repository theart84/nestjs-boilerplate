import { Inject } from '@nestjs/common';
import stringify from 'json-stringify-safe';
import { ValidationError } from 'class-validator';

import { serviceTokens } from '@app/common/service.tokens';
import { LoggerService } from '@app/logger/logger.service';

export class RequestValidationErrorService {
  constructor(
    @Inject(serviceTokens.LoggerService)
    private readonly loggerService: LoggerService,
  ) {}

  async handle(err: ValidationError[]): Promise<void> {
    await this.loggerService.warning('Validation error', {
      extra: {
        validationErrors: stringify(err),
      },
    });
  }
}
