import Cookies from 'js-cookie'
import { useState } from 'react';

// import UserPosts from './UserPosts';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/user';

const UpdateProfile = ({user,setIsUpdating}) => { //gets props from parent component and from Redux store thank to "connect"
  const token = Cookies.get("token")
  const setCurrentUser = useSetAtom(userAtom)
  const [userNameInput,setUserNameInput] = useState("")


  const fetchData = (data) => {
    fetch('http://localhost:1337/api/users-permissions/users/me', {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) //on passe les données du formulaire à l'API sous format json
    })
    .then((response) => { 
      return response.json(); 
    })
    .then((response) => {
      console.log(response);
      //push data to Jotai
      setCurrentUser({
        id:response.id,
        username:response.username
      })
      setIsUpdating(false)

    })
    .catch((error) => { console.error(error); });
  }

  function saveUpdate(event){
    if(userNameInput){
      event.preventDefault()
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      // console.log("formdata", data);
      fetchData(data)
      console.log("sauvegarde modifs");
    } else {
      alert("New user name can't be null")
    }
    
  }

  const handleValue = (e) => {
    console.log(e.target.value);
    setUserNameInput(e.target.value)
  }
  
  return(
    <div>
      <form onSubmit={saveUpdate}>
        <h2>New User Name : <input type="text" name="username" minLength={1} placeholder="Your new user name" value={userNameInput} onInput={handleValue}/></h2>
        <h2>Email : {user.email}</h2>
        <button type="submit">Save update</button>
      </form>
    </div>
  )
}

export default UpdateProfile