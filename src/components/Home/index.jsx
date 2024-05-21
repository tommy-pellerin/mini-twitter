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
        <div className="className='border-2 rounded-lg border-blue-900 mx-10 py-5'">
        <h2 className='text-2xl font-bold mb-5'>Welcome on My Social Network !</h2> 
        <h2 className='text-2xl mb-5'>This website is a training to React, global state handling and tokens.</h2>
        <h2 className='text-2xl mb-5'>Here, authentification and routing will be used to create a small social media website.</h2>
        </div>
      }
      

    </div>
  );
}

export default Home;