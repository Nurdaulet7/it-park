// src/utils/cacheUtils.js
export const CACHE_TIMEOUT = 10 * 60 * 1000; // 10 минут

export const getCachedData = (CACHE_KEY) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isCacheValid = Date.now() - timestamp < CACHE_TIMEOUT;
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
