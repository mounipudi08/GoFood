import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch("http://localhost:3001/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.geolocation,
      }),
    });
    const json = await response.json()
    console.log(json);
    
    if(!json.success){
      alert("Enter valid credentials")
    }

  };

  const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
            <small className="form-text text-muted">
              Enter Your Full Name.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <small className="form-text text-muted">Min 5 characters.</small>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
            <small className="form-text text-muted">
              Enter your current addresh
            </small>
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};
