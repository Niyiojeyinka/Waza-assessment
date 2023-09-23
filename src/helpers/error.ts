export type ErrorResponse  = {
    error: string;
}
  
export const isError = (response: ErrorResponse | any ): response is ErrorResponse => {
    return (response as ErrorResponse).error !== undefined;
}
  