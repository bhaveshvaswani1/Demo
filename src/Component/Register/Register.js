import React from "react";
import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
const NgoForm = () => {
  const [user, setUser] = useState();
  const submit = async (e) => {
    e.preventDefault();
    let res = await axios.post("http://localhost:5000/register", user);
    console.log(res.data.message);
    if (res.data.message == "Successfull") {
      alert("Successfull");
    }
    else if(res.data.message== "Username already exists") {
      alert("Username already exists");
    }
    else{
      alert("error");
    }
  };
  return (
    <div className="register-form">
      <form className="form" onSubmit={submit}>
        <h1>Sign-Up</h1>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
        <Link to="/login" className="alt">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default NgoForm;
