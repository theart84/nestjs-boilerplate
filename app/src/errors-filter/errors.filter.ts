import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

import { AppEnvironment } from '@app/common/enum/app-environment';
import { serviceTokens } from '@app/common/service.tokens';
import { SystemErrorService } from '@app/errors-filter/rest-filters/system-error.service';
import { SystemError } from '@app/system-error/system-error';
import { NotFoundService } from '@app/errors-filter/rest-filters/not-found.service';
import { DefaultService } from '@app/errors-filter/rest-filters/default.service';
import { RequestValidationErrorService } from '@app/errors-filter/rest-filters/request-validation-error.service';
import { UniqueConstraintService } from '@app/errors-filter/rest-filters/unique-constraint.service';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  constructor(
    @Inject(serviceTokens.ErrorsFilterRestFiltersSystemErrorService)
    private readonly systemErrorFilter: SystemErrorService,
    @Inject(serviceTokens.ErrorsFilterRestFiltersNotFoundService)
    private readonly notFoundFilter: NotFoundService,
    @Inject(serviceTokens.ErrorsFilterRestFiltersDefaultService)
    private readonly defaultFilter: DefaultService,
    @Inject(serviceTokens.ErrorsFilterRestFiltersRequestValidationError)
    private readonly requestValidationErrorFilter: RequestValidationErrorService,
    @Inject(serviceTokens.ErrorsFilterRestFiltersUniqueConstraintService)
    private readonly uniqueConstraintErrorFilter: UniqueConstraintService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();

    const req = ctx.getRequest<Request>();

    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === AppEnvironment.DEVELOPMENT ? err : {};

    if (err.name === 'SystemError') {
      await this.systemErrorFilter.handle(err as SystemError, res);
    } else if (err.name === 'QueryFailedError' && err.routine === '_bt_check_unique') {
      await this.uniqueConstraintErrorFilter.handle(err, res);
    } else if (err.message.error === 'Not Found') {
      await this.notFoundFilter.handle(err as Error, res);
    } else if (err.message.message instanceof Array
      && err.message.message[err.message.message.length - 1] instanceof ValidationError
    ) {
      await this.requestValidationErrorFilter.handle(err as ValidationError[], res);
    } else {
      await this.defaultFilter.handle(err as SystemError, res);
    }
  }
}
