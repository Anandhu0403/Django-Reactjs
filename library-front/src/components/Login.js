import React, { useState } from 'react'
import { loginuser } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function Login({onlogin}) {
  const[user,setuser]=useState({username:'',password:''})
  const navigate=useNavigate()
  async function login(event){
    event.preventDefault()
    let res= await loginuser(user)
    let token=res.data['token']
    //console.log(token)
    localStorage.setItem('token',"token "+token)  //localstorage.setitem(key,value)
    onlogin()
    navigate('/')

  }
  return (
    <div>Login

<div class="container w-50 border mt-5 mb-5">
        <h3>Login</h3>
        <form >
          
          <div class="mb-3">
            <label class="form-label" >Username</label>
            <input type="text" class="form-control"  onChange={(event)=>{setuser({...user,username:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">password</label>
            <input type="password" class="form-control"  onChange={(event)=>{setuser({...user,password:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <input type="submit" class="btn btn-dark" onClick={login}></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login