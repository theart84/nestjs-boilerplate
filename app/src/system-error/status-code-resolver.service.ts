import { HttpStatus } from '@nestjs/common';
import { has } from 'lodash';

import { SystemErrors } from '@app/common/enum/system-errors';

export class StatusCodeResolverService {
  private readonly mapping = {
    [SystemErrors.ROUTE_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [SystemErrors.REST_VALIDATION_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
    [SystemErrors.UNIQUE_CONSTRAINT_ALERT]: HttpStatus.CONFLICT,
    default: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  resolve(systemErrorCode: SystemErrors): number {
    return has(this.mapping, systemErrorCode) ? this.mapping[systemErrorCode] : this.mapping.default;
  }
}
