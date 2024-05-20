import { useParams } from "react-router-dom"

const DisplayProfil = ({user,setIsUpdating}) => {
  const { userID } = useParams();

  return(
    <div>
      <h2>User Name : {user.username}</h2>
      <h2>Email : {user.email}</h2>
      {userID === "me" && <button onClick={() => setIsUpdating(true)}>Modifier mon profil</button>}
    </div>
  )
}

export default DisplayProfil