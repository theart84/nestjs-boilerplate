import { CustomError } from 'ts-custom-error';

import { SystemErrors } from '@app/common/enum/system-errors';

export class SystemError extends CustomError {
  private systemCode: SystemErrors;
  private systemAdditionalData: object;

  constructor(message?: string) {
    super(message);

    Error.captureStackTrace(this, SystemError);
  }

  public getSystemCode(): SystemErrors {
    return this.systemCode;
  }

  public setSystemCode(systemCode: SystemErrors) {
    this.systemCode = systemCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getSystemAdditionalData(): object {
    return this.systemAdditionalData;
  }

  public setSystemAdditionalData(systemAdditionalData: object) {
    this.systemAdditionalData = systemAdditionalData;
  }
}
