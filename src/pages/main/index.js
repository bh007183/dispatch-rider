import Message from "../../components/message";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function Main() {
  const { global, setGlobal } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/conversation", {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      })
      .then((res) => setGlobal({ ...global, conversations: res.data }));
  }, [global.conversations.length]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/friends", {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      })
      .then((res) => setGlobal({ ...global, friends: res.data }));
  }, [global.friends.length]);

  const clickermiclicking = (event) => {
    setGlobal({
      ...global,
      participants: [
        event.currentTarget.attributes[1].value,
        localStorage.getItem("UserId"),
      ],
    });
  };

  

  return (
    <>
      <div className="participants" container>
        {global.friends.length === 0 ? (
          <></>
        ) : (
          global.friends.map((friend) =>
            friend.isOnline ? (
              <div key={friend.id} className={"profileImgPar"} >
                <Link
                  to="/conversation"
                  className="button"
                  value={friend.id}
                  onClick={clickermiclicking}
                >
                  <div
                    
                    style={{ backgroundColor: "green" }}
                    className={"foundationPar"}
                  >
                    <div className={"midlayerPar"}></div>
                  </div>
                  <h6 className="name" direction="column" >
                    {friend.firstName}
                  </h6>
                </Link>
              </div>
            ) : (
              <div key={friend.id} className={"profileImgPar"} >
                <Link
                  to="/conversation"
                  className="button"
                  value={friend.id}
                  onClick={clickermiclicking}
                >
                  <div
                    xs={12}
                    style={{ backgroundColor: "red" }}
                    className={"foundationPar"}
                  >
                    <div className={"midlayerPar"}></div>
                  </div>
                  <h6 className="name" direction="column" item >
                    {friend.firstName}
                  </h6>
                </Link>
              </div>
            )
          )
        )}
      </div>
      <div className="conversations">
      {global.conversations.length > 0 ? global.conversations.map((group) => (
        <Message
          key={group.participants}
          message={group.message}
          participants={group.participants}
          
          
        />
        
      )): <p style={{color:"white"}}>You Are not apart of any conversations at this time. To Start a conversation, tap on a friend. To start a group conversation tap on one friend then hit the plus button in the top right corner to add more friends.</p>}
      </div>
    </>
  );
}
