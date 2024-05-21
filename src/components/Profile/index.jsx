import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import UpdateProfile from './UpdateProfile';
import DisplayProfile from './DisplayProfile';
import UserPosts from './UserPosts';

// utiliser la vateur de Jotai atom pour re render apres mise à jour;
import { useAtomValue} from 'jotai';
import { userAtom } from '../atoms/user';

function Profile() {
  const currentUser = useAtomValue(userAtom)
  const token = Cookies.get("token")
  const [user,setUser] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  const { userID } = useParams();

  useEffect(() => {
    fetchData()
  }
  ,[userID,currentUser]) //utiliser la vateur de Jotai atom pour re render apres mise à jour;

  const fetchData = () => {
    
    fetch(`http://localhost:1337/api/users/${userID}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => { 
      return response.json();
    })
    .then((response) => {
      // console.log(response);
      setUser(response)
    })
    .catch((error) => { console.error(error); });
  }

  return ( 
    <div>
      <h1 className='text-3xl font-bold mb-5'>Profile</h1>      
      {isUpdating ? <UpdateProfile user={user} setIsUpdating={setIsUpdating} />:
        <>
          <DisplayProfile user={user} setIsUpdating={setIsUpdating}/>
          <UserPosts userID={userID}/>
        </>
      }
      
    </div>
  );
}

export default Profile;