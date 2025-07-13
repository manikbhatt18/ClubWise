import axios from "axios";

// Generic API handler
export const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: bodyData,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params: params,
      withCredentials: true, // For cookies/session (if backend uses cookies)
    });

    return response.data;
  } catch (error) {
    console.error("API ERROR:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
