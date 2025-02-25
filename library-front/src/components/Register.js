import React, { useState } from 'react'
import { register } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate=useNavigate()
  const[user,setuser]=useState({first_name:'',last_name:'',email:'',password:'',username:''})
  async function adduser(event){
    event.preventDefault()
    console.log(user)
    let res= await register(user)
    console.log(res)
    navigate('/login')

  }
  return (
    <div>

<div class="container w-50 border mt-5 mb-5">
        <h3>Register</h3>
        <form >
          <div  class="mb-3" >
            <label class="form-label">Email</label>
            <input type='email' class="form-control" onChange={(event)=>{setuser({...user,email:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label" >Username</label>
            <input type="text" class="form-control"  onChange={(event)=>{setuser({...user,username:event.target.value})}}></input>
          </div>
          <div  class="mb-3">
            <label class="form-label">First name</label>
            <input type="text" class="form-control" onChange={(event)=>{setuser({...user,first_name:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Last name</label>
            <input type="text" class="form-control"  onChange={(event)=>{setuser({...user,last_name:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">password</label>
            <input type="password" class="form-control"  onChange={(event)=>{setuser({...user,password:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <input type="submit" class="btn btn-dark" onClick={adduser}></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Register