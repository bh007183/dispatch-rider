import { Link } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./style.css";
export default function AddToConversation() {
  const { global, setGlobal } = useContext(GlobalContext);

 
  const click = (event) => {
    
    axios.put(
      "http://localhost:8080/update/participants",
      { old: global.participants, new: event.currentTarget.attributes[1].value },
      {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      }
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/friends", {
        headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
      })
      .then((res) => setGlobal({ ...global, friends: res.data }));
  }, [global.friends.length]);
  return (
    <div className="addFriendContainer">
      <h2 style={{ color: "white" }}>Tap on Friends to add to conversation!</h2>
      {global.friends.length === 0 ? (
        <></>
      ) : (
        global.friends.map((friend) => (
          <div key={friend.id} className={"addFriendProfileImg"}>
            <Link
              //   to="/conversation"
              className="button"
              value={friend.id}
              onClick={click}
            >
              <div className={"addFriendFoundation"}>
                <div className={"addFriendMidlayer"}></div>
                <h3 className="friendName" direction="column">
                  {friend.firstName} {friend.lastName}
                </h3>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
