export interface ResponseData<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
  error?: string;
}
