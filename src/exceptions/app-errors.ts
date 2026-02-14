export class AppError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor() {
    super('Falha de conexão. Verifique sua internet.', 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super('Sessão expirada. Faça login novamente.', 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Recurso já existe.') {
    super(message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class ValidationError extends AppError {
  constructor(public errors: Record<string, string[]>) {
    super('Dados inválidos.', 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}
