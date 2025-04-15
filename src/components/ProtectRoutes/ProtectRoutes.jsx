import { Navigate } from "react-router-dom";

const ProtectRoutes = (props) => {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectRoutes;
