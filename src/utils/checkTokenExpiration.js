export const checkTokenExpiration = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (expirationTime) {
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("tokenExpiration");
      return false;
    }
    return true;
  }

  return false;
};

export default checkTokenExpiration;
