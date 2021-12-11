
import './App.css';
import Navbar from "./Component/Navbar/Navbar"
import Calculator from "./Component/Calculator/Calculator"
import Login from "./Component/Login/Login"
import Register from "./Component/Register/Register"
import {BrowserRouter as Router, Link,Route,Switch} from "react-router-dom";
function App() {
  return (

    <>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/Login" > <Login></Login> </Route>
        
        <Route exact path="/Register" > <Register></Register> </Route>
        <Route path="/" > <Calculator></Calculator> </Route>
        
      </Switch>
    </>

  );
}

export default App;
