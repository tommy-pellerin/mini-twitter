import { useParams } from "react-router-dom"

const DisplayProfil = ({user,setIsUpdating}) => {
  const { userID } = useParams();

  return(
    <div className='border-2 rounded-lg border-blue-900 mx-10 mb-5 py-5'>
      <h2 className='text-2xl mb-5'>User Name : {user.username}</h2>
      <h2 className='text-2xl mb-5'>Email : {user.email}</h2>
      {userID === "me" && <button onClick={() => setIsUpdating(true)} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-lg">Modifier mon profil</button>}
    </div>
  )
}

export default DisplayProfil