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
    <div className="my-5">
    <h1 className='text-3xl font-bold mb-5'>All user post here</h1>
    <div className="flex flex-col items-center">
    {posts.length === 0 ? (
      <p>You have not wrote a post</p>
    ) : (
      posts.map(post => {
        const date = new Date(post.attributes.createdAt);
        // console.log(post.attributes.createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        // console.log(formattedDate);
        return (
          <div key={post.id} className="border-double border-4 rounded-lg border-blue-900 text-center w-3/5 my-1 py-2">
            <div className="flex justify-around border-b-2 pb-2">
              <span>Created at : {formattedDate}</span>
              <div className="flex justify-between">
                <p>{post.attributes.like}</p>
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
            </div>
            <p className="mt-2">{post.attributes.text}</p>
          </div>
          
        );
      })
    )}
    </div>
    </div>
  );

}

export default UserPosts;