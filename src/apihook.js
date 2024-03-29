import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const apihook = (initialConfig = {}, autoload = true) => {
  const [config, setConfig] = useState({
    url: initialConfig.url || '',
    method: initialConfig.method || 'GET',
    data: initialConfig.data || null,
    // Add other axios request configurations if needed
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const callApi = useCallback(async (overrideConfig = config) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios(overrideConfig);

      setData(response.data);
      setSuccess(true);
      setLoading(false);
      return Promise.resolve(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
      setSuccess(false);
      return Promise.reject(error);
    }
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

