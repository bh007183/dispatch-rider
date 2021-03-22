import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  const [buttonAction, setButtonAction] = useState(null);

  const handleClick = (event) => {
    setButtonAction(event.currentTarget);
  };
  const close = (event) => {
    setButtonAction(null);
  };

  return (
    <div className={styles.root}>
        
      <AppBar position="static">
      <Grid container xs={12}>
          <Grid item xs={2}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </Button>
        </Grid>
        <Menu
          id="simple-menu"
          buttonAction={buttonAction}
          keepMounted
          open={Boolean(buttonAction)}
          onClose={close}
        >
          <MenuItem onClick={close}>Profile</MenuItem>
          <MenuItem onClick={close}>My account</MenuItem>
          <MenuItem onClick={close}>Logout</MenuItem>
        </Menu>
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
