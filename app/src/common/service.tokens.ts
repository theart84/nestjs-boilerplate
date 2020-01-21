export const serviceTokens = {
  LoggerService: Symbol.for('LoggerService'),

  ConfigService: Symbol.for('ConfigService'),

  SystemErrorStatusCodeResolverService: Symbol.for('SystemErrorStatusCodeResolverService'),
  SystemErrorDtoFactory: Symbol.for('SystemErrorDtoFactory'),

  ErrorsFilter: Symbol.for('ErrorsFilter'),
  ErrorsFilterDto: Symbol.for('ErrorsFilterDto'),
  ErrorsFilterDtoFactory: Symbol.for('ErrorsFilterDtoFactory'),

  ErrorsFilterLoggerFiltersSystemErrorService: Symbol.for('ErrorsFilterLoggerFiltersSystemErrorService'),
  ErrorsFilterLoggerFiltersNotFoundService: Symbol.for('ErrorsFilterLoggerFiltersNotFoundService'),
  ErrorsFilterLoggerFiltersDefaultService: Symbol.for('ErrorsFilterLoggerFiltersDefaultService'),
  ErrorsFilterLoggerFiltersRequestValidationError: Symbol.for('ErrorsFilterLoggerFiltersRequestValidationError'),
  ErrorsFilterLoggerFiltersUniqueConstraintService: Symbol.for('ErrorsFilterLoggerFiltersUniqueConstraintService'),

  ErrorsFilterRestFiltersNotFoundService: Symbol.for('ErrorsFilterRestFiltersNotFoundService'),
  ErrorsFilterRestFiltersSystemErrorService: Symbol.for('ErrorsFilterRestFiltersSystemErrorService'),
  ErrorsFilterRestFiltersDefaultService: Symbol.for('ErrorsFilterRestFiltersDefaultService'),
  ErrorsFilterRestFiltersRequestValidationError: Symbol.for('ErrorsFilterRestFiltersRequestValidationError'),
  ErrorsFilterRestFiltersUniqueConstraintService: Symbol.for('ErrorsFilterRestFiltersUniqueConstraintService'),

  RedisService: Symbol.for('RedisService'),
};
