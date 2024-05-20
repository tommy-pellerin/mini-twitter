import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import PageNotFound from "./components/PageNoteFound"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Logout from "./components/Logout"

import { useAtomValue } from 'jotai'
import { userAtom } from './components/atoms/user'

const PrivateRoute = ({ children }) => {
  const user = useAtomValue(userAtom);
  const location = useLocation();

  return user.id ? children : <Navigate to="/login" state={{ from: location }} />;
};

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile/:userID" element={<PrivateRoute><Profile /></PrivateRoute>}/>
          <Route path="/sigup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="*" element={<PageNotFound />}/> {/*Toutes les pages non prévu afficheront cette page*/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
