import React from "react";
import Grid from "@material-ui/core/Grid";

export default function Message() {
  return (
    <Grid container xs={12}>
      <Grid item xs={4}>
        <div className={"foundation"}>
          <div className={"midlayer"}>
            <img className={"top"} alt={"profile pic"}></img>
          </div>
        </div>
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
}
