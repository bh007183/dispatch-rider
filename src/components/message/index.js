import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export default function Message(props) {
  const { global, setGlobal } = useContext(GlobalContext);
  const clickermiclicking = event => {
      event.stopPropagation()
      
      setGlobal({...global, participants: JSON.parse(event.currentTarget.attributes[0].value)})

 
  }

  const unsubScribe = (event) => {
    console.log(event.currentTarget.attributes)
  }
  return (
    <Link
      value={props.participants}
      to="/conversation"
      onClick={clickermiclicking}
      style={{ width: "100%" }}
      className="button"
      
    >
      <Grid container className={"eachMessage"} item>
        <Grid item className={"profileImg"} xs={4}>
          <div className={"foundation"}>
            <div className={"midlayer"}></div>
          </div>
        </Grid>
        <Grid className="recent" item xs={8}>
          {props.message}
        </Grid>
        
      </Grid>
    </Link>
  );
}
