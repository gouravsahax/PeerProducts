/**
 * Domain-specific OOP Error Hierarchy
 * Provides encapsulation of HTTP status codes and operational error tracking.
 */
export abstract class AppError extends Error {
  public abstract readonly statusCode: number;
  public readonly isOperational: boolean = true;

  constructor(message: string, public readonly code: string = 'APP_ERROR') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  public readonly statusCode = 401;
  constructor(message: string = 'You must be authenticated to perform this action') {
    super(message, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  public readonly statusCode = 403;
  constructor(message: string = 'You do not have permission to access this resource') {
    super(message, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  public readonly statusCode = 404;
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  public readonly statusCode = 400;
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
  }
}

export class ConflictError extends AppError {
  public readonly statusCode = 409;
  constructor(message: string) {
    super(message, 'CONFLICT');
  }
}
