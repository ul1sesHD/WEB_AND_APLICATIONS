export class ServiceError extends Error {
  public readonly code: string;
  public readonly status: number | undefined;
  public readonly details: unknown;

  constructor(message: string, code: string, status?: number, details?: unknown) {
    super(message);
    this.name    = 'ServiceError';
    this.code    = code;
    this.status  = status;
    this.details = details;
  }
}

export type Result<T> = { data: T; error: null } | { data: null; error: ServiceError };

export const ok   = <T>(data: T): Result<T>             => ({ data, error: null });
export const fail = (error: ServiceError): Result<never> => ({ data: null, error });

export const wrap = <T>(
  data: T | null,
  error: { message: string; code?: string; status?: number; details?: unknown } | null,
  defaultCode: string,
): Result<T> => {
  if (error) return fail(new ServiceError(error.message, error.code ?? defaultCode, error.status, error.details));
  if (data === null) return fail(new ServiceError('No data returned', defaultCode));
  return ok(data);
};
