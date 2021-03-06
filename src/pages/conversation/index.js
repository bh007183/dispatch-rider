import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "./style.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";




const wss = new WebSocket(`ws://localhost:8080/bru`)
wss.onopen = function(event) {
  console.log("open")
  setInterval(() => {
    wss.send(JSON.stringify(1))
  }, 30000);
}


wss.onclose = function (event) {
  console.log("connection closed")
};
wss.onerror = function (event) {
  console.log(event)
};
wss.onmessage = (event) => {
  if(JSON.parse(event.data)!== 1){
    alert(event.data)
  }else{
    console.log(event.data)
  }
  // let newArr = [...global.messages];
  //     newArr.push(JSON.parse(event.data));
      
      // setGlobal({ ...global, messages: newArr })
};


if(wss.readyState === 1){
    console.log("yay")
  }else{
    console.log("broken")
  }



export default function Conversation() {

  const { global, setGlobal } = useContext(GlobalContext);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [sendMessage, setSendMessage] = useState({
    message: "",
  });

  const [participantsData, setParticipantsData] = useState({
    data: [],
  });



  ///////////////////////////////////////////////////////////

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
        console.log(res);
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

    wss.send(JSON.stringify(data))
    
    axios
      .post("http://localhost:8080/sendMessage", data, {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      })
      .then((res) => console.log(res))
      // setGlobal({ ...global, messages: res.data })
      .catch((err) => {
        alert("Session Expired! Please Login.");
        window.location.href = "/";
      });
  };

  const deleteButton = (event) => {
    axios
      .delete(
        "http://localhost:8080/deleteMessage/" +
          event.currentTarget.attributes[3].value,
        {
          headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
        }
      )
      .then((res) => console.log(res));
  };

  return (
    <>
      <div className="participants" container>
        {participantsData ? (
          participantsData.data.map((friend) => (
            <Grid container key={friend.id} className={"profileImgPar"}>
              <div
                item
                xs={12}
                style={{ backgroundColor: "green" }}
                className={"foundationPar"}
              >
                <div className={"midlayerPar"}></div>
              </div>
              <Grid item xs={12}>
                <h6 className="name" direction="column">
                  {friend.firstName}
                </h6>
              </Grid>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </div>
      <Grid container className="mainMessageContainer">
        {global.messages.map((mess, index) =>
          mess.author === parseInt(localStorage.getItem("UserId")) ? (
            <Grid key={index} className="messageSubContainer" container>
              <Grid style={{ opacity: ".1" }} item xs={2}></Grid>
              <Grid className="containWords" item xs={8}>
                {mess.message}
              </Grid>
              <Grid item xs={2}>
                <IconButton value={mess.id} onClick={deleteButton}>
                  <DeleteForeverIcon style={{ color: "white" }} />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid key={index} className="messageContainer" container>
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
