import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user";

import Cookies from "js-cookie";

const Like = ({ likeUsersList, postId, likeQuantity, setLikeRefresh }) => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [likeState, setLikeState] = useState(""); //Attention,
  const token = Cookies.get("token");

  //à l'ouverture de la page, je vérifie si le post a été liké ou pas afin d'affiche le bon bouton
  function checkIfLiked() {
    if (likeUsersList.some((user) => user.id === currentUser.id)) {
      setLikeState(true); //Si l'utilisateur a déjà liké, alors LikeState = true
    } else {
      setLikeState(false); //Si l'utilisateur n'a pas encore liké, alors LikeState = true
    }
  }

  useEffect(() => checkIfLiked(), [likeQuantity]);

  function UpdateData(bodyToFetch) {
    fetch(`http://localhost:1337/api/posts/${postId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: bodyToFetch,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setLikeRefresh(Date.now()); //Je renvoi n'importe quoi à displayPOst pour lui dire de mettre à la jour les posts ainsi que ses likes quantity
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleToggle = () => {
    let bodyToFetch = {};
    if (likeState) {
      //Attention likeState est asynchrone ! du coup on va ajouter et soustraire  avant le changement de State
      bodyToFetch.like = likeQuantity - 1; //Si likeState est true, ie l'utilisateur a déjà liké, il va donc cliquer sur dislike
      bodyToFetch.users_likes = likeUsersList.filter(
        (user) => user.id !== currentUser.id
      );
    } else {
      (bodyToFetch.like = likeQuantity + 1), //Si likeState est false, ie l'utilisateur n'a pas encore liké, il va donc cliquer sur like
        (bodyToFetch.users_likes = [...likeUsersList, currentUser.id]);
    }
    UpdateData(bodyToFetch);
  };

  return (
    <button onClick={handleToggle}>
      {likeState ? (
        <div className="hover:bg-blue-700 hover:bg-opacity-50 rounded-full">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#1E3A8A"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
        
        </div>
      ) : (
        <div className="hover:bg-blue-700 hover:bg-opacity-50 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#1E3A8A"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
        </div>
      )}{" "}
      {/*Attention si likeState est true veut dire que l'utilisateur a deja liké, il ne pourra donc que disliké*/}
    </button>
  );
};

export default Like;
