import { APIResponse, Exception } from '../providers/api';
import { MESSAGES } from '../providers/constants';

export function successHandler<T>(data: T) {
  return new APIResponse(200, data, 'Success');
}

export function notFoundHandler(error?: string) {
  return new APIResponse(404, error, MESSAGES.DATA_NOT_FOUND);
}

export function exceptionHandler(error: Error) {
  return new Exception(500, MESSAGES.INTERNAL_SERVER_ERROR, error.message);
}

export function valdationErrorHandler(error: any) {
  return new APIResponse(400, null, MESSAGES.VALIDATION_ERROR, error);
}

export function unauthorizedErrorHandler(error: any) {
  return new APIResponse(401, null, MESSAGES.UNAUTHORIZED_ACCESS, error);
}

export function accessForbiddenErrorHandler(error: any) {
  return new APIResponse(403, null, MESSAGES.ACCESS_FORBIDDEN, error);
}