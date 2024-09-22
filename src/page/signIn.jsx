import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    // console.log(formDatas)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await fetch('http://localhost:5000/server/auth/sign-in', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
            });
        const data = await res.json();
        const access = data.token
        if(data.success === false){
            alert(data.message)
            dispatch(signInFailure(data.message))
            return
        }
        localStorage.setItem('token', access)
        dispatch(signInSuccess(data))
        navigate('/')
        } catch (error) {
            dispatch(signInFailure(error.message))
            console.error(error)
        }
        
    }

  return (
    <div className='p-3 max-w-lg mx-auto gap-3'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
            <input type="email" placeholder='Email' id='email' className='border rounded p-3' onChange={handleChange} />
            <input type="password" placeholder='Password' id='password' className='border rounded p-3'  onChange={handleChange} />
            <button  disabled={loading} type='submit' className='uppercase bg-slate-700 text-white p-3 rounded hover:opacity-95 disabled:opacity-80 active:bg-slate-600'>{loading ? 'Loading...':'Sign in'}</button>
            <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Don't have an account?</p>
            <Link to={"/register"}><span className='text-blue-700'>Sign up</span></Link>
        </div>
    </div>
  )
}
