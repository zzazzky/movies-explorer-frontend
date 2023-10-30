import { Navigate } from "react-router-dom";

function AuthorizationRouteElement({ component: Component, ...props }) {
  return props.loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Component {...props} />
  );
}

export default AuthorizationRouteElement;
