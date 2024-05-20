import { Link } from "react-router-dom";
import "./index.css"
import Logout from "../Logout"

function Navbar() {
  return ( 
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile/me">Profile</Link>
      <Link to="/sigup">Sign up</Link>
      <Link to="/login">Log in</Link>
      <Logout/>
    </nav>
    
  );
}

export default Navbar;