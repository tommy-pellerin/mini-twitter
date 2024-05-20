import { useEffect,useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user";

import Cookies from 'js-cookie'

const Like = ({likeUsersList, postId, likeQuantity, setLikeRefresh}) => {
  const [currentUser,setCurrentUser] = useAtom(userAtom)
  const [likeState,setLikeState] = useState("") //Attention, 
  const token = Cookies.get('token');

  //à l'ouverture de la page, je vérifie si le post a été liké ou pas afin d'affiche le bon bouton
  function checkIfLiked() {
    if(likeUsersList.some(user => user.id === currentUser.id)){
      setLikeState(true) //Si l'utilisateur a déjà liké, alors LikeState = true
    } else {
      setLikeState(false) //Si l'utilisateur n'a pas encore liké, alors LikeState = true
    }
  }

  useEffect(() => checkIfLiked(),[likeQuantity])

  function UpdateData(bodyToFetch) {
    fetch(`http://localhost:1337/api/posts/${postId}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: bodyToFetch
      })
    })
    .then((response) => {
      return response.json(); 
    })
    .then((response) => {
      console.log(response);
      setLikeRefresh(Date.now()) //Je renvoi n'importe quoi à displayPOst pour lui dire de mettre à la jour les posts ainsi que ses likes quantity
    })
    .catch((error) => { console.error(error); });
  }

  const handleToggle = () =>{
    let bodyToFetch = {};
    if(likeState){ //Attention likeState est asynchrone ! du coup on va ajouter et soustraire  avant le changement de State
      bodyToFetch.like= likeQuantity - 1 //Si likeState est true, ie l'utilisateur a déjà liké, il va donc cliquer sur dislike
      bodyToFetch.users_likes = likeUsersList.filter(user => user.id !== currentUser.id)
    } else {
      bodyToFetch.like= likeQuantity + 1, //Si likeState est false, ie l'utilisateur n'a pas encore liké, il va donc cliquer sur like
      bodyToFetch.users_likes = [...likeUsersList,currentUser.id]
    }    
    UpdateData(bodyToFetch)
  }

  return(
    <button onClick={handleToggle}>
      {likeState? "Dislike":"Like"} {/*Attention si likeState est true veut dire que l'utilisateur a deja liké, il ne pourra donc que disliké*/}
    </button>
  )
}

export default Like