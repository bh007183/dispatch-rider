import Message from "../../components/message";
import React, { useState, useContext, useEffect} from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css"

import Grid from "@material-ui/core/Grid";
import axios from "axios";



export default function Main() {
    const { global, setGlobal } = useContext(GlobalContext);

    useEffect(() => {
        axios.get("http://localhost:8080/friends", {
                headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
              }).then(res => setGlobal({...global, friends: res.data}))
    }, [])


  

  return (
    <>
      <Grid className="participants" container>
        {global.friends.map((friend) =>
          friend.isOnline ? (
            <Grid item className={"profileImgPar"} xs={2}>
              <div style={{backgroundColor: "green"}} className={"foundationPar"}>
                <div className={"midlayerPar"}></div>
              </div>
              
            </Grid>
          ) : (
            <Grid item className={"profileImgPar"} xs={2}>
              <div style={{backgroundColor: "red"}} className={"foundationPar"}>
                <div className={"midlayerPar"}></div>
              </div>
             
            </Grid>
          )
        )}
      </Grid>
      <Message />
    </>
  );
}
