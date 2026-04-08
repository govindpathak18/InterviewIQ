import { useState } from 'react';

export const useFakeLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (asyncFn) => {
    setLoading(true);
    try {
      return await asyncFn();
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
};
