export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}
