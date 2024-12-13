import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../utils/api";

const Interceptor401 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return null;
};

export default Interceptor401;
