import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 className="text-danger">Loading...</h1>
  );
}
