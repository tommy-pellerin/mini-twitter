import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom"

function Signup() {
  const navigate = useNavigate(); // use to Redirect to home page

  const fetchData = (data) => {
    fetch('http://localhost:1337/api/auth/local/register', {
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
      // Cookies.set('token', response.jwt);
      console.log(response);
      navigate('/login'); // Redirect to login page
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
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Name</label><br />
          <input type="text" id="userName" name="username" placeholder="Your user name" required></input>
        </div>
        <div>
          <label htmlFor="Email">Email</label><br />
          <input type="email" id="Email" name="email" placeholder="Your Email" required></input>

        </div>
        <div>
          <label htmlFor="Password">Password</label><br />
          <input type="password" id="Password" name="password" placeholder="Your Password" required minLength={6}></input>

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;