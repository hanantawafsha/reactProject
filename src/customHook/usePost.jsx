import { useState } from "react";
import axios from "axios";

export default function usePost(url, postDataValue, headers = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async () => {
    setIsLoading(true);
    try {
      const responseData = await axios.post(url, postDataValue,{
        headers: headers,
       
      });
      setResponse(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error };
}
