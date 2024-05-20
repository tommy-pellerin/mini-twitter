import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom"
//connect to Jotai
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/user.js';
import { RESET } from 'jotai/utils'

function Logout() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  function signout(){
    Cookies.remove('token'); //vider les cookies
    setUser(RESET); //vider local storage
    console.log("signout ok");
    navigate('/'); // Redirect to home page
  }

  return ( 
    <button onClick={signout}>Log Out</button>
  );
}

export default Logout;