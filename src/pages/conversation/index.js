import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "./style.css";

export default function Conversation() {
  const { global, setGlobal } = useContext(GlobalContext);

  const [sendMessage, setSendMessage] = useState({
    message: "",
  });

  useEffect(() => {
      const ws = new WebSocket('ws://localhost:3030');
      ws.onopen = () => {
        axios
        .get(
          `http://localhost:8080/conversation/specific/${global.participants}`,
          {
            headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
          }
        )
        .then((res) => setGlobal({ ...global, messages: res.data }))
        .catch((err) => console.error(err));
      }
    
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
      </Grid>
      <Grid container>
        {global.messages.map((mess) =>
          mess.author === parseInt(localStorage.getItem("UserId")) ? (
            <Grid className="messageContainer" container>
              <Grid style={{ opacity: ".1" }} item xs={2}></Grid>
              <Grid item xs={8}>
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
