// src/services/errorHandler.js

export const errorHandler = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400: return data.message || "Invalid request (400). Please check your data.";
      case 401: return "Unauthorized (401): Invalid email or password.";
      case 500: return "Internal Server Error (500): Server is down.";
      case 502: return "Bad Gateway (502): Server is being updated.";
      default: return `Error ${status}: Something went wrong.`;
    }
  } else if (error.request) {
    return "Network Error: No response from server.";
  } else {
    return error.message || "An unknown error occurred.";
  }
};