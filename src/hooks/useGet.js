import { useEffect, useState } from "react";
import instance from "../util/axios";

const useGet = (url, callback = () => {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [c, setC] = useState(0);

  const fetch = async () => {
    setError(false);
    try {
      const res = await instance.get(url);
      setData(res.data);
      setLoading(false);
      setError(false);
      callback(res.data);
    } catch (error) {
      setData(null);
      setLoading(false);
      setError(true);
    }
  };

  const reload = () => setC(c + 1);
  const backgroundReload = fetch;
  useEffect(() => {
    setLoading(true);
    fetch();
  }, [c]);

  return { reload, loading, error, data, backgroundReload };
};

export default useGet;
