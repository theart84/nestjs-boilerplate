import { Response } from 'express';
import { Inject } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { serviceTokens } from '@app/common/service.tokens';
import { NotFoundService as LoggerNotFountService } from '@app/errors-filter/logger-filters/not-found.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';
import { SystemErrors } from '@app/common/enum/system-errors';

export class NotFoundService implements IRestFilter {
  constructor(
    @Inject(serviceTokens.ErrorsFilterLoggerFiltersNotFoundService)
    private readonly loggerNotFoundService: LoggerNotFountService,
    @Inject(serviceTokens.SystemErrorStatusCodeResolverService)
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    @Inject(serviceTokens.ErrorsFilterDtoFactory)
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: Error, res: Response): Promise<void> {
    await this.loggerNotFoundService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.ROUTE_NOT_FOUND, 'Not found');

    res.status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.ROUTE_NOT_FOUND));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
