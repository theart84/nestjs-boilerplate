import { Module } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import { ErrorsFilter } from '@app/errors-filter/errors.filter';
import { SystemErrorModule } from '@app/system-error/system-error.module';
import { SystemErrorService } from '@app/errors-filter/rest-filters/system-error.service';
import { LoggerModule } from '@app/logger/logger.module';

import { SystemErrorService as LoggerSystemErrorService } from '@app/errors-filter/logger-filters/system-error.service';
import { DefaultService as LoggerDefaultService } from '@app/errors-filter/logger-filters/default.service';
import { NotFoundService as LoggerNotFoundService } from '@app/errors-filter/logger-filters/not-found.service';
import {
  RequestValidationErrorService as LoggerRequestValidationErrorService,
} from '@app/errors-filter/logger-filters/request-validation-error.service';
import {
  UniqueConstraintService as LoggerUniqueConstraintService,
} from '@app/errors-filter/logger-filters/unique-constraint.service';

import { ErrorsFactory } from '@app/errors-filter/dto/errors.factory';
import { NotFoundService } from '@app/errors-filter/rest-filters/not-found.service';
import { DefaultService } from '@app/errors-filter/rest-filters/default.service';
import { RequestValidationErrorService } from '@app/errors-filter/rest-filters/request-validation-error.service';

import { UniqueConstraintService } from '@app/errors-filter/rest-filters/unique-constraint.service';

@Module({
  imports: [
    SystemErrorModule,
    LoggerModule,
  ],
  providers: [{
    provide: serviceTokens.ErrorsFilter,
    useClass: ErrorsFilter,
  }, {
    provide: serviceTokens.ErrorsFilterDtoFactory,
    useClass: ErrorsFactory,
  }, {
    provide: serviceTokens.ErrorsFilterLoggerFiltersSystemErrorService,
    useClass: LoggerSystemErrorService,
  }, {
    provide: serviceTokens.ErrorsFilterLoggerFiltersNotFoundService,
    useClass: LoggerNotFoundService,
  }, {
    provide: serviceTokens.ErrorsFilterLoggerFiltersDefaultService,
    useClass: LoggerDefaultService,
  }, {
    provide: serviceTokens.ErrorsFilterLoggerFiltersRequestValidationError,
    useClass: LoggerRequestValidationErrorService,
  }, {
    provide: serviceTokens.ErrorsFilterLoggerFiltersUniqueConstraintService,
    useClass: LoggerUniqueConstraintService,
  }, {
    provide: serviceTokens.ErrorsFilterRestFiltersSystemErrorService,
    useClass: SystemErrorService,
  }, {
    provide: serviceTokens.ErrorsFilterRestFiltersNotFoundService,
    useClass: NotFoundService,
  }, {
    provide: serviceTokens.ErrorsFilterRestFiltersDefaultService,
    useClass: DefaultService,
  }, {
    provide: serviceTokens.ErrorsFilterRestFiltersRequestValidationError,
    useClass: RequestValidationErrorService,
  }, {
    provide: serviceTokens.ErrorsFilterRestFiltersUniqueConstraintService,
    useClass: UniqueConstraintService,
  }],
})
export class ErrorsFilterModule {
}
