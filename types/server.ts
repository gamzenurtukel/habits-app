export interface IServerResponse<TData> {
  data: TData;
  errors: string[] | null;
  isSuccessful: boolean;
  statusCode: number;
  pageNumber: number;
  totalItemCount: number;
}
