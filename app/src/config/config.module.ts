import { Global, Module } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import { ConfigService } from '@app/config/config.service';

@Global()
@Module({
  providers: [{
    provide: serviceTokens.ConfigService,
    useValue: new ConfigService(),
  }],
  exports: [
    serviceTokens.ConfigService,
  ],
})
export class ConfigModule {}
