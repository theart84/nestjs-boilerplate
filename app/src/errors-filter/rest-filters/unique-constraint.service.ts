import stringify from 'json-stringify-safe';
import { Response } from 'express';
import { Inject } from '@nestjs/common';

import {
  UniqueConstraintService as LoggerUniqueConstraintService,
} from '@app/errors-filter/logger-filters/unique-constraint.service';
import { serviceTokens } from '@app/common/service.tokens';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { LoggerService } from '@app/logger/logger.service';
import { SystemErrors } from '@app/common/enum/system-errors';

export class UniqueConstraintService {
  constructor(
    @Inject(serviceTokens.LoggerService)
    private readonly loggerService: LoggerService,
    @Inject(serviceTokens.ErrorsFilterLoggerFiltersUniqueConstraintService)
    private readonly loggerUniqueConstraint: LoggerUniqueConstraintService,
    @Inject(serviceTokens.ErrorsFilterDtoFactory)
    private readonly errorsFactory: ErrorsFactory,
    @Inject(serviceTokens.SystemErrorStatusCodeResolverService)
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
  ) {
  }

  public async handle(err: Error, res: Response): Promise<void> {
    await this.loggerUniqueConstraint.handle(err);

    const dto = this.errorsFactory.create(
      err,
      SystemErrors.UNIQUE_CONSTRAINT_ALERT,
      'Database unique constraint has occurred.',
    );

    res.setHeader('Content-Type', 'application/json');

    res
      .status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.UNIQUE_CONSTRAINT_ALERT))
      .send(stringify(dto.normalize()))
    ;
  }
}
