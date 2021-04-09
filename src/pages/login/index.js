import React, { useState, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
    Link
  } from "react-router-dom";
import "./style.css";
import axios from "axios"




export default function Login() {
    

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

 const handleChange = event => {
     let name = event.target.name;
     let value = event.target.value;
     setLogin({...login, [name]: value})
 }

 const handleSubmit = (event) => {
     event.preventDefault()
     axios.post("http://localhost:8080/login", login)
     .then((res) => {
         localStorage.setItem("Auth", res.data.auth);
         localStorage.setItem("UserId", res.data.id);
        
        window.location.href = "/main"
        
        
         
    }).catch(err => alert("Invalid Authentication"))

 }
  return (
    <Grid container className="loginContain">
      <Grid item xs={1}></Grid>
      <Grid item xs={10} className="loginForm">
        <h4 style={{ color: "white" }}>Log In</h4>

        <Grid item className="inputContain" xs={12}>
          <input
          onChange={handleChange}
            className="input top"
            placeholder="Username"
            name="username"
            value={login.username}
          ></input>
        </Grid>

        <Grid item className="inputContain" xs={12}>
          <input
          onChange={handleChange}
            className="input bottom"
            placeholder="Password"
            name="password"
            type="password"
            value={login.password}
          ></input>
        </Grid>
        <Grid item className="inputContain" xs={12}>
          <Button onClick={handleSubmit} className="loginButton" variant="contained" color="primary">
            Enter
          </Button>
        </Grid>
        <Link to="/create">
          <h6 style={{ color: "white", marginBottom: "2px" }}>Creat Account</h6>
        </Link>
      </Grid>

      <Grid item xs={1}></Grid>
    </Grid>
  );
}
