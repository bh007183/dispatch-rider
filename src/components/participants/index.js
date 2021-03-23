import React from "react";
import Grid from "@material-ui/core/Grid";
export default function Participants(props) {
  return (
    <Grid className="participants" container>
      <Grid item className={"profileImgPar"} xs={4}>
        <div className={"foundationPar"}>
          <div className={"midlayerPar"}></div>
        </div>
      </Grid>
    </Grid>
  );
}
