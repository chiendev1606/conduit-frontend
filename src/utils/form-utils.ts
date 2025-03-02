import { AxiosError } from 'axios';

export const handleErrorApi = (error: any) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? 'Unexpected error';
  }
  return error?.payload?.message ?? 'Unexpected error';
};

export const getError = (field: any) => {
  return field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined;
};
