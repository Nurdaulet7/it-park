// src/utils/cacheUtils.js
export const DEFAULT_CACHE_TIMEOUT = 10 * 60 * 1000;

export const getCachedData = (
  CACHE_KEY,
  cacheTimeout = DEFAULT_CACHE_TIMEOUT
) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isCacheValid = Date.now() - timestamp < cacheTimeout;
    if (isCacheValid) {
      return data;
    }
  }
  return null;
};

export const cacheData = (CACHE_KEY, data) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

export const clearCache = (CACHE_KEY) => {
  localStorage.removeItem(CACHE_KEY);
};
