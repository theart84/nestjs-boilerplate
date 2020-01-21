import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@app/app.module';
import { ErrorsFilterModule } from '@app/errors-filter/errors-filter.module';
import { serviceTokens } from '@app/common/service.tokens';

(async () => {
  const app = await NestFactory.create(AppModule);

  const errorsFilter = app.select<ErrorsFilterModule>(ErrorsFilterModule).get(serviceTokens.ErrorsFilter);

  app.useGlobalFilters(errorsFilter);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    transform: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
    },
  }));

  app.setGlobalPrefix('/api');

  await app.listen(process.env.APP_PUBLIC_PORT);
})();
