import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkTokenExpiration = () => {
  const token = localStorage.getItem("jwtToken");
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (token && expirationTime) {
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

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default PrivateRoute;
