import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); // create provide which represents GoogleAuthProvider() from 'firebase/auth'
      const auth = getAuth(app) //with getAuth method import app from firebase.js inside ()
      const result = await signInWithPopup(auth, provider)

      const res = await fetch('http://localhost:5000/server/auth/google', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
      })

      const data = await res.json()
      const access = data.token
      localStorage.setItem('token', access)

      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('could not connect with google', error)
    }
  }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded uppercase hover:opacity-95'>
      Contunue with google
    </button>
  )
}
