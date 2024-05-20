import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
//get data from Jotai
import { useAtomValue} from 'jotai';
import { userAtom } from '../atoms/user';

function UserPosts({userID}) {
  const [posts,setPosts] = useState([])
  const currentUser = useAtomValue(userAtom)

  useEffect(() => {
    fetchData()
  }
  ,[userID])

  const fetchData = () => {
    const token = Cookies.get("token")
    let url=""
    if(userID ==="me"){
      url= `http://localhost:1337/api/posts?filters[author][id][$eq]=${currentUser.id}&sort=createdAt:desc`
    } else {
      url = `http://localhost:1337/api/posts?filters[author][id][$eq]=${userID}&sort=createdAt:desc`
    }
    fetch(url, { //special filter
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
      console.log(response);
      // const sortedPosts = response.data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
      setPosts(response.data)
      // setPosts(sortedPosts)
    })
    .catch((error) => { console.error(error); });
  }
  return ( 
    <>
    <h1>All user post here</h1>
    {posts.length === 0 ? (
      <p>You have not wrote a post</p>
    ) : (
      posts.map(post => {
        const date = new Date(post.attributes.createdAt);
        // console.log(post.attributes.createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        // console.log(formattedDate);
        return (
          <div key={post.id}>
            <div>
              <p>Like : {post.attributes.like}</p>
            </div>
            <p>Post : {post.attributes.text}</p>
            <span>Created at : {formattedDate}</span>
            <hr />
          </div>
          
        );
      })
    )}
    
    </>
  );

}

export default UserPosts;