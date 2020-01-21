import { Inject } from '@nestjs/common';

import { AppEnvironment } from '@app/common/enum/app-environment';
import { serviceTokens } from '@app/common/service.tokens';
import { ConfigService } from '@app/config/config.service';
import { ConfigNames } from '@app/config/enum/config-names';
import { ErrorsDto } from '@app/errors-filter/dto/errors.dto';
import { SystemErrors } from '@app/common/enum/system-errors';

export class ErrorsFactory {
  private readonly nodeEnv: AppEnvironment;

  constructor(
    @Inject(serviceTokens.ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.nodeEnv = configService.get(ConfigNames.NODE_ENV) as AppEnvironment;
  }

  create(err: object, code: SystemErrors, message = '', data: object = {}) {
    const dto = new ErrorsDto();

    dto
      .setCode(code)
      .setError(err)
    ;

    if (this.nodeEnv === AppEnvironment.DEVELOPMENT) {
      dto
        .setData(data)
        .setMessage(message)
      ;
    }

    return dto;
  }
}
