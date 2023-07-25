import React, { useState } from 'react'
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()

    // Signup pw auth
    if (!isLogin && password !== confirmPassword) {
      setError("The passwords don't match!")
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
      })
    
    const data = await response.json()

    if(data.detail){
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('Token', data.token)

      window.location.reload()
    }
  }

  return (
    <div className='flex justify-center m-[3.1rem]'>
      <div className='w-[30rem] overflow-hidden rounded-[0.6rem] shadow-md bg-gradient-to-br from-white '>
        <form className='flex flex-col h-[18.5rem] p-[1.2rem] items-center'>
          <h2 className='text-[2rem]'>{isLogin ? 'Please log in' : 'Create an account'}</h2>
          <input className='mt-2 pl-2 w-[16rem] h-[2.6rem] rounded-[6px] bg-gray-100' type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
          <input className='mt-2 pl-2 w-[16rem] h-[2.6rem] rounded-[6px] bg-gray-100' type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
          {!isLogin && <input className='mt-2 pl-2 w-[16rem] h-[2.6rem] rounded-[6px] bg-gray-100' type="password" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>}
          <input type="submit" className='mt-4 w-[6rem] rounded-md bg-sky-700 text-white hover:text-black hover:bg-sky-400 cursor-pointer shadow-lg' onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
          {error && <p className=' text-xs text-red-500 px-[2px]'>{error}</p>}
        </form>
        <div className='flex '>
          <button className='w-[50%] border-0 p-[10px] hover:bg-sky-700 hover:text-white' onClick={() => viewLogin(false)}>Sign up</button>
          <button className='w-[50%] border-0 p-[10px] hover:bg-sky-700 hover:text-white' onClick={() => viewLogin(true)}>Login</button>

        </div>
      </div>
    </div>
  )
}

export default Auth