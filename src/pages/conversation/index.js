
import React, { useContext, useEffect} from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css"
import {Link} from "react-router-dom"

import Grid from "@material-ui/core/Grid";
import axios from "axios";



export default function Conversation() {
    return (
        <>
      <Grid className="participants" container>
        
            
            <Grid  item className={"profileImgPar"} xs={3}>
              <div  className="button" >
              <div xs={12} style={{backgroundColor: "green"}} className={"foundationPar"}>
                <div className={"midlayerPar"}></div>
                
                
              </div>
              <h6 className="name" direction='column' item xs={12}></h6>
              
              </div>
              </Grid>
            
  
           
        
    
      </Grid>
        </>
    )
}
