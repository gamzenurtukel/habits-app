import { baseQuery } from "../services/api";

async function responseHandler(args: any, api: any, extraOptions: any) {
  let result: any = await baseQuery(args, api, extraOptions);

  switch (result.meta.response?.status) {
    case 201:
      //createdHandler();
      break;
    case 400:
      //badRequestHandler();
      break;
    case 401:
      result = await baseQuery("/refreshToken", api, extraOptions);

      break;
    case 403:
      //forbiddenHandler(args, api);
      break;
    case 404:
      //notFoundHandler();
      break;
    case 500:
      //serverErrorHandler();
      break;
    default:
      break;
  }

  return result;
}

export default responseHandler;
