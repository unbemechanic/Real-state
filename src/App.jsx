import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./page/home"
import SignIn from "./page/signIn"
import SignOut from "./page/signOut"
import About from "./page/about"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-out" element={<SignOut/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile"/>
      </Routes>
    </BrowserRouter>
  )
}
