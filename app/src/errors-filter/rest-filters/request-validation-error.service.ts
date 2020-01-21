import { Response } from 'express';
import { Inject } from '@nestjs/common';
import stringify from 'json-stringify-safe';
import { ValidationError } from 'class-validator';

import { serviceTokens } from '@app/common/service.tokens';
import {
  RequestValidationErrorService as LoggerRequestValidationErrorService,
} from '@app/errors-filter/logger-filters/request-validation-error.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';
import { SystemErrors } from '@app/common/enum/system-errors';

export class RequestValidationErrorService implements IRestFilter {
  constructor(
    @Inject(serviceTokens.ErrorsFilterLoggerFiltersRequestValidationError)
    private readonly loggerRequestValidationErrorService: LoggerRequestValidationErrorService,
    @Inject(serviceTokens.SystemErrorStatusCodeResolverService)
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    @Inject(serviceTokens.ErrorsFilterDtoFactory)
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: ValidationError[], res: Response): Promise<void> {
    await this.loggerRequestValidationErrorService.handle(err);

    const dto = this.errorsDtoFactory.create(err, SystemErrors.REST_VALIDATION_ERROR, 'Not found');

    res.status(this.systemErrorStatusCodeResolver.resolve(SystemErrors.REST_VALIDATION_ERROR));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
