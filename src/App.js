import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from "./components/header"
import Main from "./pages/main"

function App() {
  return (
    <div className="App">
      <Container style={{padding:"0px"}} maxWidth="xs">
        <Header/>
        <Main/>

            </Container>
      
    </div>
  );
}

export default App;
