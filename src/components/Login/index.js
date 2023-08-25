import React, { useContext, useState } from "react";
import "./login.css";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "../../RestaurantsContext";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const { user } = useContext(RestaurantsContext);
  const { userDispatch } = useContext(RestaurantsDispatchContext);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const { err, accessToken } = await response.json();
    if (err) {
      enqueueSnackbar(err, { variant: "error" });
      return;
    }
    localStorage.setItem("access_token", accessToken);
    navigate(-1);
    enqueueSnackbar("Login Successful", { variant: "success" });
    userDispatch({ type: "create", user: JSON.stringify(credentials) });
  };

  if (user) {
    return;
  }

  return (
    <form className="signup-form">
      <h2>Login to your account</h2>
      <label htmlFor="username" className="label">
        Username:
        <input
          type="text"
          name="username"
          onChange={(e) =>
            setCredentials((credentials) => ({
              ...credentials,
              username: e.target.value,
            }))
          }
          value={credentials.username}
          className="outline"
        />
      </label>
      <label htmlFor="password" className="label">
        Password:
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setCredentials((credentials) => ({
              ...credentials,
              password: e.target.value,
            }))
          }
          value={credentials.password}
          className="outline"
        />
      </label>
      <button onClick={loginHandler} className="login-btn btn filled">
        Login
      </button>
      <div>
        <span>Don't have an account: </span>
        <Link to={"/signup"}>
          <button className="btn link-to-btn">Sign up</button>
        </Link>
      </div>
    </form>
  );
};
