import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import axios from "axios";
import { GlobalContext } from "../../globalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginTop: 8,
    marginBottom: 0,
  },
}));

export default function Header() {
  const { global, setGlobal } = useContext(GlobalContext);
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.clear();
    handleClose();
    window.location.href = "/";
  };

  const Unsubscribe = () => {

    axios.put("https://dispatch-rider-back.herokuapp.com/unsubscribe", global.participants, {
      headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
    }).then(res => res.data === "Success" ? window.location.href = "/main" : alert("somthings amis"))
    .catch(err => console.log(err))

  }


  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Grid container>
          <Grid item xs={2}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/AddFriends">
                <MenuItem onClick={handleClose}>Add Friend</MenuItem>
              </Link>
              <Link to="/main">
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Link>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </Grid>

          <Grid item xs={7}>
            <p className={styles.user}>Ben Hopkins</p>
          </Grid>
          <Grid item className="rightButton" xs={3}>
            {window.location.pathname === "/conversation" ? 
            <>
            <IconButton onClick={Unsubscribe}>
              <UnsubscribeIcon />
            </IconButton>
              <Link to="/addToConversation">
            <IconButton >
              <AddIcon />
            </IconButton>
            </Link>
            </>
            : 
            window.location.pathname === "/addToConversation" ? 
           
            <Link style={{color: "white"}} to="/conversation"> 
            
              Back
            
            </Link>
            
            : <></>}
            
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
