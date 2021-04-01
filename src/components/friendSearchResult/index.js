import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css"

export default function FriendSearchResults(props) {


    const clickermiclicking = event => {
        console.log(event.currentTarget.value)
    }
  return (
    <button value={props.id} style={{width: "100%", marginTop:"2%"}} className="button" onClick={clickermiclicking} >
    <Grid container className={"eachMessage"} item >
      <Grid item className={"profileImg"} xs={4}>
        <div className={"foundation"}>
          <div className={"midlayer"}>
          </div>
        </div>
      </Grid>
      <Grid className="SearchedName" item xs={8}>
        <p>{props.firstName} {props.lastName}</p>
      </Grid>
      
    </Grid>
    </button >
   
  );
}
