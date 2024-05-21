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
    <div className='border-2 rounded-lg border-blue-900 mx-10 py-5'>
      <h1 className='text-3xl font-bold mb-5'>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className='my-3'>
          <label htmlFor="userName">Name</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="text" id="userName" name="username" placeholder="Your user name" required></input>
        </div>
        <div className='my-3'>
          <label htmlFor="Email">Email</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="email" id="Email" name="email" placeholder="Your Email" required></input>

        </div>
        <div className='my-3'>
          <label htmlFor="Password">Password</label><br />
          <input className="border-2 rounded-lg border-blue-900 px-10 text-center" type="password" id="Password" name="password" placeholder="Your Password" required minLength={6}></input>

        </div>
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-lg">Submit</button>
      </form>
    </div>
  );
}

export default Signup;