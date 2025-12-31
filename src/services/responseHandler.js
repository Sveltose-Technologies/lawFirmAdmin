import { API_MESSAGES } from "../constants/apiMessages";

export const responseHandler = (response) => {
  const method = response.config.method.toLowerCase(); // get, post, put, delete
  let message = API_MESSAGES.FETCH_SUCCESS;

  // Method के हिसाब से ऑटोमैटिक मैसेज चुनना
  if (method === "post") message = API_MESSAGES.CREATE_SUCCESS;
  if (method === "put" || method === "patch") message = API_MESSAGES.UPDATE_SUCCESS;
  if (method === "delete") message = API_MESSAGES.DELETE_SUCCESS;

  return {
    success: true,
    data: response.data,
    message: response.data?.message || message, // अगर API से मैसेज आया तो वो, नहीं तो हमारा default
    statusCode: response.status,
  };
};