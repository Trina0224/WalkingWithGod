import useSWR from 'swr'; //for api.bible
import Axios from 'axios'; //for api.bible

const useFetch = url => {
  const fetcher = async (...args) => {
    return Axios.get(...args, {
      headers: { 'api-key': process.env.REACT_APP_APIBIBLE_API_KEY },
    }).then(res => res.data);
  };

  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};

export default useFetch;
