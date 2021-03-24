import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Grid from "@material-ui/core/Grid";
import axios from "axios";


  

export default function Conversation() {
    const { global, setGlobal } = useContext(GlobalContext);

    const [sendMessage, setSendMessage] = useState({
        message: ""
    })
   const handleChange = event => {
       let name = event.target.name;
       let value = event.target.value;
       setSendMessage({...sendMessage, [name]: value})
   }

   const handleSubmit = (event) => {
       let data = {
           participants: global.participants,
           message: sendMessage.message
       }
       console.log(data)
       event.preventDefault()
       axios.post("http://localhost:8080/sendMessage", data, {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      }).then(res => console.log(res))
   }
//    setGlobal({...global, messages: res.data}
  return (
    <>
      <Grid className="participants" container>
        <Grid item className={"profileImgPar"} xs={3}>
          <div className="button">
            <div
              xs={12}
              style={{ backgroundColor: "green" }}
              className={"foundationPar"}
            >
              <div className={"midlayerPar"}></div>
            </div>
            <h6 className="name" direction="column" item xs={12}></h6>
          </div>
        </Grid>
        <Grid container className="bottomNav">
        <Grid item xs={9}>
          <textarea onChange={handleChange} name="message" value={sendMessage.message} placeholder="Enter Dispatch..." className="messageInput"></textarea>
        </Grid>
        <Grid item xs={3}>
         <button onClick={handleSubmit}>
           <SendIcon/>
         </button>
        </Grid>
        
      </Grid>
      </Grid>
      
    </>
  );
}
