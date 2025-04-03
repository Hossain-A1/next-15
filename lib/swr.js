import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url); 
    return data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const useFetch = (url) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
