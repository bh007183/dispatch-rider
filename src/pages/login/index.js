import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
    Link
  } from "react-router-dom";
import "./style.css";

export default function Login() {
  return (
    <Grid container className="loginContain">
      <Grid item xs={1}></Grid>
      <Grid item xs={10} className="loginForm">
        <h4 style={{ color: "white" }}>Log In</h4>

        <Grid item className="inputContain" xs={12}>
          <input
            className="input top"
            placeholder="Username"
            name="username"
          ></input>
        </Grid>

        <Grid item className="inputContain" xs={12}>
          <input
            className="input bottom"
            placeholder="Password"
            name="password"
            type="password"
          ></input>
        </Grid>
        <Grid item className="inputContain" xs={12}>
          <Button className="loginButton" variant="contained" color="primary">
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
