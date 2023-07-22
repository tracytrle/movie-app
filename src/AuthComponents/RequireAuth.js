// import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

function RequireAuth({ children }) {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return children;
}

export default RequireAuth;
