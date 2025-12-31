import axios from "axios";
import { errorHandler } from "./errorhandler";
import { responseHandler } from "./responseHandler";
import { toast } from "react-toastify"; 

const api = axios.create({
  baseURL: "https://nodejs.nrislawfirm.com",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  (response) => {
    const res = responseHandler(response);
  
    // GET को छोड़कर बाकी सब (POST, PUT, DELETE) पर अपने आप टोस्ट दिखाएँ
    if (response.config.method !== "get") {
      toast.success(res.message || "Success!");
    }
    return res;
  },
  (error) => {
    const errorMsg = errorHandler(error);
    
    // एरर आने पर अपने आप लाल टोस्ट दिखाएँ
    toast.error(errorMsg || "An error occurred"); 
    
    return Promise.reject(errorMsg);
  }
);

export default api;