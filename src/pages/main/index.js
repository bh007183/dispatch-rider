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
    const clickermiclicking = event => {
        event.stopPropagation()
        console.log(event.currentTarget.attributes[0].value)
    }

  

  return (
    <>
      <Grid className="participants" container>
        {global.friends.map((friend) =>
          friend.isOnline ? (
            
            <Grid item className={"profileImgPar"} xs={3}>
              <div className="button" value={friend.id} onClick={clickermiclicking} >
              <div xs={12} style={{backgroundColor: "green"}} className={"foundationPar"}>
                <div className={"midlayerPar"}></div>
                
                
              </div>
              <h6 className="name" direction='column' item xs={12}>{friend.firstName}</h6>
              
              </div>
              </Grid>
            
          ) : (
           
            <Grid  item className={"profileImgPar"} xs={3}>
              <div className="button" value={friend.id} onClick={clickermiclicking} >
              <div xs={12} style={{backgroundColor: "red"}} className={"foundationPar"}>
                <div className={"midlayerPar"}></div>
                
                
              </div>
              <h6 className="name" direction='column' item xs={12}>{friend.firstName}</h6>
              
              </div>
              </Grid>
           
          
        
          )
        )}
      </Grid>
      <Message />
    </>
  );
}
