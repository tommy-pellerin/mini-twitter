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
      console.log(sortedPosts);
      setPosts(sortedPosts);
      setTotalPages(response.meta.pagination.pageCount)
      console.log(response.meta.pagination.pageCount);
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
    <>
      <h1>Display posts here</h1>
      {
        posts.map(post => 
          <div key={post.id}>
            <p>Id : {post.id}</p>
            <p>Author : <Link to={`Profile/${post.attributes.author.data.id}`}>{post.attributes.author.data.attributes.username}</Link></p>
            <p>Content: {post.attributes.text}</p>
            <p>Like quantity : {post.attributes.like}</p>
            <Like setLikeRefresh={setLikeRefresh} postId={post.id} likeQuantity={post.attributes.like} likeUsersList={post.attributes.users_likes.data}/>
            <hr />
          </div>
        )
      }
      <div>
        {page > 1 && <button onClick={previousPage}>-</button>}
        <p>{page}</p>
        {page < totalPages &&<button onClick={nextPage}>+</button>}
      </div>
      
    </>
  )
}

export default DisplayPosts