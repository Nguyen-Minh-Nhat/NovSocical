import { useState } from "react";

const useMutation = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (callback) => {
    setIsLoading(true);
    try {
      const res = await callback();
      if (res.data.success) {
        setData(res.data);
        setIsSuccess(true);
      } else setIsError(res.data.message);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, isSuccess, data, mutate };
};

export default useMutation;
