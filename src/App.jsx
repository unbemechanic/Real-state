import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./page/home"
import SignIn from "./page/signIn"
import SignOut from "./page/signOut"
import About from "./page/about"
import Header from "./components/header"
import Register from "./page/register"
import Profile from "./page/profile"
import PrivateRoute from "./components/privateRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-out" element={<SignOut/>} />
        <Route path="/about" element={<About/>} />
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
