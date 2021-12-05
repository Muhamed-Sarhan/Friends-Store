import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MainContext } from "./Context";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const value = useContext(MainContext);
  const [user] = value.user;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !user ? <Redirect to={"/login"} /> : <RouteComponent {...routeProps} />
      }
    />
  );
};

export default PrivateRoute;
