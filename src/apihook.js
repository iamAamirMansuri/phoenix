import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const apihook = (initialConfig = {}, autoload = true) => {
  const [config, setConfig] = useState({
    url: initialConfig.url || '',
    method: initialConfig.method || 'GET',
    data: initialConfig.data || null,
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const callApi = useCallback(() => {
    setLoading(true);
    return axios(config)
      .then(response => {
        setData(response.data);
        setSuccess(true);
        return response.data; // Ensure data is returned for chaining
      })
      .catch(err => {
        setError(err.response ? err.response.data : err.message);
        setSuccess(false);
        throw err; // Ensure errors are re-thrown for chaining
      })
      .finally(() => setLoading(false));
  }, [config]);

  useEffect(() => {
    if (autoload) {
      callApi();
    }
  }, [callApi, autoload]);

  const refetch = useCallback(() => {
    callApi();
  }, [callApi]);

  return { data, loading, success, error, refetch, setConfig };
};

