import instance from "../util/axios";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const post = async (url, data) => {
    setLoading(true);
    setError(false);
    return new Promise((resolve, reject) => {
      try {
        const res = await instance.post(url, data);
        setData(res.data);
        setLoading(false);
        setError(false);
        resolve(res);
      } catch (error) {
        setData(res.data);
        setLoading(false);
        setError(true);
        reject(error);
      }
    });
  };

  return { post, loading, error, data };
};

export default usePost;
