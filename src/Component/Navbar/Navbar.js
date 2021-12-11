import "./Navbar.css"
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
function Navbar() {
    const [auth,setAuth] = useState(false);

    useEffect(()=>{
        var token = localStorage.getItem("token");
        if(token)setAuth(true);
    },[])
    function logout(){
        localStorage.clear();
        setAuth(false);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item active">
            <Link to="/" >  <a className="nav-link" style={{color:"white"}}  href="#">calculator</a> </Link>
            </li>
            {
            (auth==false) ?
            <>
            <li className="nav-item active">
            <Link to="/Login" >  <a className="nav-link"  style={{color:"white"}}  href="#">Login</a> </Link>
            </li>
            <li className="nav-item active">
            <Link to="/Register" >  <a className="nav-link" style={{color:"white"}} href="#">Register</a> </Link>
            </li>
            </>
            :
            <li className="nav-item active">
            <Link to="/" >  <a onClick={logout} className="nav-link" style={{color:"white"}}  href="#">Logout</a> </Link>
            </li>
            
            }
          </ul>
        </div>
      </nav>
    );
}
export default Navbar;