import React, { useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios"

export default function CreateAccount() {
  const [newAccount, setNewAccount] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    initialPassword: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = event => {
    if(newAccount.password === newAccount.initialPassword){
        axios.post("http://localhost:8080/api/create/account", newAccount)
        .then(res => 
            {
                if(res.data.errors)
                {alert(res.data.errors[0].message)}
                else{window.location.href = "/"}
            })
        .catch(err => alert(err))
    }else{
        alert("Password does not match!")
    }
    
      
  }
  return (
    <Grid container className="createAccountContain">
      <Grid item xs={1}></Grid>
      <Grid item xs={10} className="createForm">
        <h4 style={{ color: "white" }}>Create Account</h4>
        <Grid container>
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="First"
              name="firstName"
              value={newAccount.firstName}
            ></input>
          </Grid>
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="Last"
              name="lastName"
              value={newAccount.lastName}
            ></input>
          </Grid>
        </Grid>
        <Grid container className="subContain">
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="Username"
              name="username"
              value={newAccount.username}
            ></input>
          </Grid>
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="Email"
              name="email"
              value={newAccount.email}
            ></input>
          </Grid>
        </Grid>
        <Grid container className="subContain">
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="Password"
              name="initialPassword"
              value={newAccount.initialPassword}
            ></input>
          </Grid>
          <Grid item xs={6}>
            <input
              onChange={handleChange}
              placeholder="Verify Password"
              name="password"
              value={newAccount.password}
            ></input>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            className="createAccountButton"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Enter
          </Button>
        </Grid>

        <Link to="/">
          <h6 style={{ color: "white", marginBottom: "2px" }}>Login</h6>
        </Link>
      </Grid>

      <Grid item xs={1}></Grid>
    </Grid>
  );
}
