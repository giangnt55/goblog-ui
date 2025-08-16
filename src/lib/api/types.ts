export type Result<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
