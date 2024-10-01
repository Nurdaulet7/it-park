import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthToken } from "../../../redux/slices/authSlice";
import { checkTokenExpiration } from "../../../utils/checkTokenExpiration";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken); // Получаем токен из глобального состояния

  useEffect(() => {
    if (!token || !checkTokenExpiration()) {
      navigate("/");
    }
  }, [token, navigate]);

  console.log("Children");
  return token ? children : null;
};

export default PrivateRoute;
