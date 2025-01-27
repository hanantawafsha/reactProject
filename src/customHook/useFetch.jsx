import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useFetch(url) {
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setResponse(response);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getData();
    }, [url]);
  
    return { response, error, isLoading };
  }

  

  