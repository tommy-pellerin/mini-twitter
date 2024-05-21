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
    <div className='border-2 rounded-lg border-blue-900 mx-10 py-5'>
      <h1 className='text-3xl font-bold mb-5'>Write your post here:</h1>
      <form onSubmit={savePost}>
        <label>
          <textarea type="text" name="text" placeholder="Your text" required className="border-2 rounded-lg border-blue-900 px-5 text-center w-9/12 h-28"/>
        </label>
        <br />
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-lg">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
