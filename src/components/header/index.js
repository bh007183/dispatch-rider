import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom"

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
      marginBottom: 0
  }
  
}));

export default function Header() {
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
    window.location.href = "/"
  }

  return (
    <div className={styles.root}>
        
      <AppBar position="static">
      <Grid container >
          <Grid item xs={2}>
       
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/AddFriends"><MenuItem onClick={handleClose}>Add Friend</MenuItem></Link>
        <Link to="/main"><MenuItem onClick={handleClose}>My account</MenuItem></Link>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
        </Grid>
        
        <Grid item xs={8}>
         <p className={styles.user} >Ben Hopkins</p>
        </Grid>
        <Grid item xs={2}>
        <MenuIcon/>
        </Grid>
        
        </Grid>
      </AppBar>
      
    </div>
  );
}
