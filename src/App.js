import logo from "./logo.svg";
import "./App.css";
import Container from "@material-ui/core/Container";
import Header from "./components/header";
import Main from "./pages/main";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { GlobalContext } from "./globalContext";
import Conversation from "./pages/conversation";
import AddFriends from "./pages/addFriends"
import AddToConversation from "./pages/addToConversation";

function App() {
  const [global, setGlobal] = useState({
    friends: [],
    participants: [],
    messages: [],
    conversations: [],
    
  });

  const memo = useMemo(() => ({ global, setGlobal }), [global, setGlobal]);
  const state = useState(() => ({ global, setGlobal }), [global, setGlobal]);


  return (
    <div className="App">
      <Container className="container" style={{ padding: "0px" }} maxWidth="xs">
        <GlobalContext.Provider value={{global, setGlobal}}>
        <Router>
          <Header />
          
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/main">
                <Main />
              </Route>
              <Route exact path="/create">
                <CreateAccount />
              </Route>
              <Route exact path="/conversation">
                <Conversation />
              </Route>
              <Route exact path="/AddFriends">
                <AddFriends />
              </Route>
              <Route exact path="/addToConversation">
                <AddToConversation />
              </Route>
            </Switch>
          </Router>
        </GlobalContext.Provider>
      </Container>
    </div>
  );
}

export default App;
