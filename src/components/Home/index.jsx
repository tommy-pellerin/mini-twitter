import { useState } from "react"
import DisplayPosts from "./DisplayPosts"
import CreatePost from "./CreatePost"
//connect to Jotai
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user.js';

function Home() {
  const [currentUser,setCurrentUser]=useAtom(userAtom)
  
  return ( 
    <div>
      {
        currentUser.username ?
        <>
          <CreatePost/>
          <DisplayPosts/>
        </>
        :
        <h2>Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</h2>
      }
      

    </div>
  );
}

export default Home;