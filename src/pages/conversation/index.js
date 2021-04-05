import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "./style.css";

export default function Conversation() {
  const { global, setGlobal } = useContext(GlobalContext);

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
 }

  const [sendMessage, setSendMessage] = useState({
    message: "",
  });

  const [participantsData, setParticipantsData] = useState({
    data: []
  });





///////////////////////////////////////////////////////////
// When a connection is made
// socket.onopen = function() {
//   console.log('Opened connection 🎉');

//   // send data to the server
//   var json = JSON.stringify({ message: 'Hello 👋' });
//   socket.send(json);
// }

// // When data is received
// socket.onmessage = function(event) {
//   console.log(event.data);
// }

/////////////////////////////////////////////////////////////
  useEffect(() => {
  
      axios
      .get(
        `http://localhost:8080/conversation/specific/${global.participants}`,
        {
          headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
        }
      )
      .then((res) => {
        setGlobal({ ...global, messages: res.data });
        scrollToBottom();
        console.log(res)
      })
      .catch((err) => console.error(err));
  }, [global.messages.length]);

  useEffect(() => {
  
      axios
      .get(
        `http://localhost:8080/groupconversation/specific/${global.participants}`,
        {
          headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
        }
      )
      .then((res) => {
        setParticipantsData({ data: res.data });
      })
      .catch((err) => console.error(err));
  }, []);


  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setSendMessage({ ...sendMessage, [name]: value });
  };

  const handleSubmit = (event) => {
    let data = {
      participants: global.participants,
      message: sendMessage.message,
      author: localStorage.getItem("UserId"),
    };
    event.preventDefault();
    axios
      .post("http://localhost:8080/sendMessage", data, {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      })
      .then((res) => setGlobal({ ...global, messages: res.data }))
      .catch((err) => {
        alert("Session Expired! Please Login.");
        window.location.href = "/";
      });
  };


  return (
    <>
      <Grid className="participants" container>
        {participantsData ? participantsData.data.map(friend =>
            
              <div key={friend.id} className={"profileImgPar"} >
                
                  <div
                    
                    style={{ backgroundColor: "green" }}
                    className={"foundationPar"}
                  >
                    <div className={"midlayerPar"}></div>
                  </div>
                  <h6 className="name" direction="column" >
                    {friend.firstName}
                  </h6>
                
              </div>
         ) : <></>}
      </Grid>
      <Grid container className="mainMessageContainer">
        {global.messages.map((mess) =>
          mess.author === parseInt(localStorage.getItem("UserId")) ? (
            <Grid className="messageSubContainer" container>
              <Grid style={{ opacity: ".1" }} item xs={2}></Grid>
              <Grid className="containWords" item xs={8}>
                {mess.message}
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          ) : (
            <Grid className="messageContainer" container>
              <Grid style={{ opacity: ".1" }} item xs={2}></Grid>
              <Grid item xs={8}>
                {mess.message}
              </Grid>
              <Grid item xs={2}>
                placeholder
              </Grid>
            </Grid>
          )
        )}
        <div ref={messagesEndRef} />
       
      </Grid>

      <Grid container className="bottomNav">
        <Grid item xs={9}>
          <textarea
            onChange={handleChange}
            name="message"
            value={sendMessage.message}
            placeholder="Enter Dispatch..."
            className="messageInput"
          ></textarea>
        </Grid>
        <Grid item xs={3}>
          <button onClick={handleSubmit}>
            <SendIcon />
          </button>
        </Grid>
      </Grid>
    </>
  );
}
