import { SystemError } from '@app/system-error/system-error';
import { SystemErrors } from '@app/common/enum/system-errors';

export class SystemErrorFactory {
  public create(systemErrorCode: SystemErrors, message = '', data: object = {}): SystemError {
    const systemError = new SystemError(message);

    systemError.setSystemCode(systemErrorCode);
    systemError.setSystemAdditionalData(data);

    return systemError;
  }
}
