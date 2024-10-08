export const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) return null;

  const tokenParts = token.split(".");

  if (tokenParts.length !== 3) return null;

  const payloadBase64 = tokenParts[1];
  const payloadDecoded = atob(payloadBase64);
  const payloadObject = JSON.parse(payloadDecoded);

  return payloadObject.user?.id || null;
};

export default getUserIdFromToken;
