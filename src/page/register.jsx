import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Register() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/server/auth/register', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
            });
        const data = await res.json();
        if(data.success === false){
            setError(errror.message);
            setLoading(false);
            return
        }
        setLoading(false)
        setError(null);
        navigate('/sign-in')
        console.log(data)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
        
    }

  return (
    <div className='p-3 max-w-lg mx-auto gap-3'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
            <input type="text" placeholder='Username' id='username' className='border rounded p-3'  onChange={handleChange} />
            <input type="email" placeholder='Email' id='email' className='border rounded p-3' onChange={handleChange} />
            <input type="password" placeholder='Password' id='password' className='border rounded p-3'  onChange={handleChange} />
            <button  disabled={loading} type='submit' className='uppercase bg-slate-700 text-white p-3 rounded hover:opacity-95 disabled:opacity-80 active:bg-slate-600'>{loading ? 'Loading...':'Sign up'}</button>
            <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={"/sign-in"}><span className='text-blue-700'>Sign in</span></Link>
        </div>
    </div>
  )
}
