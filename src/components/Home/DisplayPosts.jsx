import { useState,useEffect } from "react";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import Like from "./Like";

const DisplayPosts = () => {
  const token = Cookies.get('token');
  const [posts,setPosts] = useState([])
  const [likeRefresh,setLikeRefresh] = useState("")
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)

  function getPosts() {
    fetch(`http://localhost:1337/api/posts?populate=*&pagination[pageSize]=5&pagination[page]=${page}`, {
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
      // console.log(response.data[0].attributes.author.data);
      const sortedPosts = response.data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
      // console.log(sortedPosts);
      setPosts(sortedPosts);
      setTotalPages(response.meta.pagination.pageCount)
      // console.log(response.meta.pagination.pageCount);
    })
    .catch((error) => { console.error(error); });
  }

  useEffect(getPosts,[likeRefresh,page])

  function previousPage(){
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  }

  function nextPage(){
    if (page < totalPages) {
      setPage(page + 1);
    }
    window.scrollTo(0, 0);
  }

  return(
    <div className="my-5">
      <h1 className='text-3xl font-bold mb-5'>All posts :</h1>
      <div className="flex flex-col items-center">
      {
        posts.map(post => {
          const date = new Date(post.attributes.createdAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
          return (
            <div key={post.id} className="border-double border-4 rounded-lg border-blue-900 text-center w-3/5 my-1 py-2">
              <div className="flex justify-around border-b-2 pb-2">
                <Link to={`Profile/${post.attributes.author.data.id}`} className="flex justify-between hover:bg-blue-700 hover:bg-opacity-30 rounded-md px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <p>{post.attributes.author.data.attributes.username}</p>
                </Link>
                <span>Created at : {formattedDate}</span>
                <div className="flex justify-between">
                  <p>{post.attributes.like}</p>
                  <Like setLikeRefresh={setLikeRefresh} postId={post.id} likeQuantity={post.attributes.like} likeUsersList={post.attributes.users_likes.data}/>
                </div>
              </div>

              <p className="mt-2">{post.attributes.text}</p>
            </div>
          )
        })
      }
      </div>
      
      <div className="flex justify-center mt-5">
        {page > 1 && <button onClick={previousPage} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg">-</button>}
        <p className="mx-5">page : {page}</p>
        {page < totalPages &&<button onClick={nextPage} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg">+</button>}
      </div>
      
    </div>
  )
}

export default DisplayPosts