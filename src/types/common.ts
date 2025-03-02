import { HttpStatusCode } from 'axios';

export type ApiResponse<T> = {
  data: T;
  status: HttpStatusCode;
};
