# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## une autre méthode pour gérer les affichages de like:
### 1.créer un atom :
import { atom } from 'jotai';

// Create an atom for each post's likes
const likesAtom = atom({});

### 2.1 Dans displayPOsts component appel l'atom, 
import { useAtom } from 'jotai';

// Inside your component
const [likes, setLikes] = useAtom(likesAtom);
### 2.2 ensuite créer mettre à jour l'objet de l'atom avec la liste des post ainsi que les quantité de chaque post
.then((response) => {
  const sortedPosts = response.data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
  setPosts(sortedPosts);

  // Update likesAtom with the number of likes for each post
  const newLikes = sortedPosts.reduce((acc, post) => {
    acc[post.id] = post.attributes.likes;
    return acc;
  }, {});
  setLikes(newLikes);
})

### 3. Dans displayport afficher la quantité en fonction de l'id du post
posts.map(post => 
  <div key={post.id}>
    <p>Id : {post.id}</p>
    <p>Likes : {likes[post.id]}</p>
    {/* ... */}
  </div>
)

### 4. Dans Like.jsx, mettre à jour la quantité des like avec les click
  setLikes(likes => ({ ...likes, [postId]: likes[postId] + 1 }));
  ou 
  setLikes(likes => ({ ...likes, [postId]: likes[postId] - 1 }));


## Différence entre <Navigate/> et navigate("/")
<Navigate/> est un composant et est utilisé dans le rendu JSX de votre composant, tandis que navigate("/chemin") est une fonction et est utilisée dans le code de gestion des événements ou d'autres fonctions de votre composant.

### state?
<Navigate to="/login" state={{ from: location }} />
State n'est pas nécessaire, mais peut etre intéressant pour retenir la page ouverte avant le changement de page.
cependant, une fois utilisé, il faut le rappeler dans la redirection ex:
let location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };
navigate(from);

# React children
In React, children is a special prop that is used to pass components as data to other components. This allows you to create component structures like <Parent><Child /></Parent>.

In your PrivateRoute and LoggedRoute components, children is the component that you want to render inside the route. For example, in <PrivateRoute><Profile /></PrivateRoute>, Profile is the children of PrivateRoute.