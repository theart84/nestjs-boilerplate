import { Global, Module } from '@nestjs/common';

import { serviceTokens } from '@app/common/service.tokens';
import { StatusCodeResolverService } from '@app/system-error/status-code-resolver.service';
import { SystemErrorFactory } from '@app/system-error/system-error.factory';

@Global()
@Module({
  providers: [{
    provide: serviceTokens.SystemErrorStatusCodeResolverService,
    useValue: new StatusCodeResolverService(),
  }, {
    provide: serviceTokens.SystemErrorDtoFactory,
    useValue: new SystemErrorFactory(),
  }],
  exports: [
    serviceTokens.SystemErrorStatusCodeResolverService,
    serviceTokens.SystemErrorDtoFactory,
  ],
})
export class SystemErrorModule {}
