import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css"

export default function Message() {


    const clickermiclicking = event => {
        event.stopPropagation()
        console.log(event.currentTarget.value)
    }
  return (
    <button value="test" style={{width: "100%"}} className="button" onClick={clickermiclicking} >
    <Grid container className={"eachMessage"} item >
      <Grid item className={"profileImg"} xs={4}>
        <div className={"foundation"}>
          <div className={"midlayer"}>
          </div>
        </div>
      </Grid>
      <Grid className="recent" item xs={8}>
        

      </Grid>
      
    </Grid>
    </button >
   
  );
}
