import {  useEffect, useState } from "react";

const useFetch = (API_URL) => {
  const [data, setData] =useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
fetchData();
  }, [API_URL])
  return {data, loading, error}
}

export default useFetch;