import React from 'react'
import './login.css'

const Login = () => {

  const loginwithgoogle = ()=>{
    //instead of axios we have used window to open a backend page
    window.open("http://localhost:3001/auth/google/callback","_self")
  }

  return (
    <>
      <div className='login-page'>
          <h1 style={{textAlign:"center"}}>Login</h1>
          <div className='form'>
            <form className='login-form'>
                <input type='text' placeholder='username'/>
                <input type='password' placeholder='password'/>
                <button>Login</button>
                <p className='message'>Not Registered? <a href='#'>Create an account</a></p>
            </form>
            <button className='login-with-google-btn' onClick={loginwithgoogle}>
                Sign In with google
            </button>
          </div>
      </div>
    </>
  )
}

export default Login