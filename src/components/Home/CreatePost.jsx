import Cookies from 'js-cookie'
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';

const CreatePost = () => {
  const token = Cookies.get('token');
  const [curentUser,setCurrentUser] = useAtom(userAtom)

  function fetchData(dataToFetch){
    fetch('http://localhost:1337/api/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: dataToFetch
      })
    })
    .then((response) => { 
      return response.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => { console.error(error); });
  }

  const savePost = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const textAndAuthor = {...data, "author": curentUser.id}
    fetchData(textAndAuthor)
  }

  return(
    <div>
      <h1>Write your post here:</h1>
      <form onSubmit={savePost}>
        <label>
          <textarea type="text" name="text" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
