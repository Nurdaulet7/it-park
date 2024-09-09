import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "../../../utils/checkTokenExpiration";

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
