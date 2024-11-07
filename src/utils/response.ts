export const response = (message: string, data: any = {}, success: boolean = true) => {
  return {
    success,
    message,
    data,
  };
};
