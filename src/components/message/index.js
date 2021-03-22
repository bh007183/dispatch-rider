import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css"

export default function Message() {
  return (
    <Grid container className={"eachMessage"} item xs={12}>
      <Grid item className={"profileImg"} xs={4}>
        <div className={"foundation"}>
          <div className={"midlayer"}>

          </div>
        </div>
      </Grid>
      <Grid className="recent" item xs={8}>
        

      </Grid>
    </Grid>
  );
}
