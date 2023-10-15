export class Exception {
  public statusCode: number;

  public message: string;

  public error: string;

  constructor(
    protected readonly status: number,
    protected readonly responseMessage: string,
    protected readonly errorMessage: string,
  ) {
    this.statusCode = status;
    this.message = responseMessage;
    this.error = errorMessage;
  }
}