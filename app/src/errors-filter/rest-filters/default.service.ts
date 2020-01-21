import { Response } from 'express';
import { Inject, HttpStatus } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { serviceTokens } from '@app/common/service.tokens';
import { DefaultService as LoggerDefaultService } from '@app/errors-filter/logger-filters/default.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemError } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';
import { SystemErrors } from '@app/common/enum/system-errors';

export class DefaultService implements IRestFilter {
  constructor(
    @Inject(serviceTokens.ErrorsFilterLoggerFiltersDefaultService)
    private readonly loggerDefaultService: LoggerDefaultService,
    @Inject(serviceTokens.SystemErrorStatusCodeResolverService)
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    @Inject(serviceTokens.ErrorsFilterDtoFactory)
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: SystemError, res: Response): Promise<void> {
    await this.loggerDefaultService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.OTHER, 'Internal error');

    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
