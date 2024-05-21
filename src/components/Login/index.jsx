import Cookies from 'js-cookie'
import {useNavigate, useLocation} from "react-router-dom"
//connect to Jotai
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/user.js';

function Login() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom)
  let location = useLocation();

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

      // Redirect to prévious page or to home page
      let { from } = location.state || { from: { pathname: "/" } };
      navigate(from);
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
    <div className='border-2 rounded-lg border-blue-900 mx-10 py-5'>
      <h1 className='text-3xl font-bold mb-5'>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <div className='my-3'>
          <label htmlFor="Email">Email</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="email" id="Email" name="identifier" placeholder="Your Email" required></input>
        </div>
        <div className='my-3'>
          <label htmlFor="Password">Password</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="password" id="Password" name="password" placeholder="Your Password" required></input>

        </div>
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-lg">Submit</button>
      </form>
    </div>
  );
}

export default Login;