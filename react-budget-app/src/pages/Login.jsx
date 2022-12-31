import LoginForm from '../components/LoginComp'
import React from 'react'
import '../App.css'
import { getLogin } from '../context/Requests'

const Login = () => {

  return (
    <div className='container my-5 h-50h-auto loginFormOuter '>
        <h2 className='my-4 d-block mx-auto center'>Login with Username</h2>
        <LoginForm  getLogin={getLogin} />
    </div>
  )
}

export default Login