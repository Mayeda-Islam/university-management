import IGenericErrorMessage from './error';

export type IGenericResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
