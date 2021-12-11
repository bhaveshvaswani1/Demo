import React, { useState } from "react";
import "./Login.css";
import { Link, Redirect, Route } from "react-router-dom";
import axios from "axios";
import history from "../../history";
export default function NgoForm() {
  const [user, setUser] = useState();
  const submit = async (e) => {
    e.preventDefault();
    let data = await axios.post("http://localhost:5000/login", user);
    // console.log(data.data.user.username);
    if (data.data.msg == "successfull") {
      localStorage.setItem("user", data.data.user.username);
      localStorage.setItem("token", data.data.token);
      //could have used redux or context api for state management 
      history.push("/");
      window.location.reload();
    } else if (data.data.msg == "Wrong Password") {
      alert("Wrong Password");
    } else {
      alert("Wrong username");
    }
  };
  return (
    <div className="login-form">
      <form className="form" onSubmit={submit}>
        <h1>Sign-In</h1>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/register" className="alt">
          {" "}
          Create an account?
        </Link>
      </form>
    </div>
  );
}
