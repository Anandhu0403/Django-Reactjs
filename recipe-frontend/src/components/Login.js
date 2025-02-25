import React, { useState } from 'react'
import { loginuser } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function Login({onlogin}) {
    const[user,setUser]=useState({username:'',password:''})
    const navigate=useNavigate()
    async function login(event) 
    {
     event.preventDefault()
     let res=await loginuser(user)
     let token=res.data['token']
     console.log(token)
     localStorage.setItem('token',"token "+token)
     onlogin()
     console.log(localStorage.getItem('token')); // Check if token is stored

    navigate('/')

    }
  return (
    <div>
         <div className='container w-50'>
                <h2>Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={(event) => { setUser({ ...user, username: event.target.value }) }}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={(event) => { setUser({ ...user, password: event.target.value }) }}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
                </form>
            </div>
    </div>
  )
}

export default Login