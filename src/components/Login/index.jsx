import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom"
//connect to Jotai
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/user.js';

function Login() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom)

  const fetchData = (data) => {
    fetch('http://localhost:1337/api/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) //on passe les données du formulaire à l'API sous format json
    })
    .then((response) => { 
      return response.json(); 
    })
    .then((response) => {
      Cookies.set('token', response.jwt);
      console.log(response);
      // Dispatch Jotai store
      setUser({
        id:response.user.id,
        username:response.user.username
      })

      navigate('/'); // Redirect to home page
    })
    .catch((error) => { console.error(error); });
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    fetchData(data)
  }

  return ( 
    <div>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email</label><br />
          <input type="email" id="Email" name="identifier" placeholder="Your Email" required></input>
        </div>
        <div>
          <label htmlFor="Password">Password</label><br />
          <input type="password" id="Password" name="password" placeholder="Your Password" required></input>

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;