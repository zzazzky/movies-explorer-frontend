import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ component: Component, ...props }) {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRouteElement;
