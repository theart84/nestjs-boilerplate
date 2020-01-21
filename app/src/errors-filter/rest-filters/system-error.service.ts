import { Response } from 'express';
import { Inject } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import {
  SystemErrorService as DefaultSystemErrorService,
} from '@app/errors-filter/logger-filters/system-error.service';
import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemError } from '@app/system-error/system-error';
import { IRestFilter } from '@app/errors-filter/rest-filters/interfaces/rest-filter.interface';

export class SystemErrorService implements IRestFilter {
  constructor(
    @Inject(serviceTokens.ErrorsFilterLoggerFiltersSystemErrorService)
    private readonly defaultSystemErrorService: DefaultSystemErrorService,
    @Inject(serviceTokens.SystemErrorStatusCodeResolverService)
    private readonly systemErrorStatusCodeResolver: StatusCodeResolverService,
    @Inject(serviceTokens.ErrorsFilterDtoFactory)
    private readonly errorsDtoFactory: ErrorsFactory,
  ) {}

  async handle(err: SystemError, res: Response): Promise<void> {
    await this.defaultSystemErrorService.handle(err);

    res.status(this.systemErrorStatusCodeResolver.resolve(err.getSystemCode()));
    res.json(
      this.errorsDtoFactory.create(
        err,
        err.getSystemCode(),
        err.getMessage(),
        err.getSystemAdditionalData(),
      ).normalize(),
    );
  }
}
