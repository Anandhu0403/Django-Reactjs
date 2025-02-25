import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { logoutuser } from '../services/Apicalls'

function Navbar({islogin,onlogout}) {
  const[w,setw]=useState()
  function input(event){
    setw(event.target.value)
  }
  const navigate=useNavigate()
  function search(){
    navigate(`/search/?search=${w}`)
  }
  async function handlelogout(){

    let res= await logoutuser()
    if(res.status>199 && res.status<399)
    {
      localStorage.removeItem('token')
      onlogout()
      navigate('/')
    }

  }
  return (
    <div>
       <nav class="navbar navbar-expand-lg bg-body-dark  navbar-dark bg-dark">
  <div class="container-fluid">
    <Link to="/" class="text-decoration-none">
    <a class="navbar-brand" href="#">Library</a></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
        
      <li class="nav-item active">
        <Link to="/" class="text-decoration-none">
        <a class="nav-link " href="#">Home</a></Link>
      </li>
      {islogin && (             //conditional rendering
        <>
      <li class="nav-item">
        <Link to="view" class="text-decoration-none">
        <a class="nav-link" href="#">View</a></Link>
      </li>
      <li class="nav-item">
        <Link to="add" class="text-decoration-none">
        <a class="nav-link" href="#">Add</a></Link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onClick={handlelogout}>Logout</a>
      </li>
      </>
      )}
      {!islogin && (
        <>
      <li class="nav-item">
        <Link to="register" class="text-decoration-none">
        <a class="nav-link" href="#">Register</a></Link>
      </li>
      <li class="nav-item">
        <Link to="login" class="text-decoration-none">
        <a class="nav-link" href="#">Login</a></Link>
      </li>
      </>
     )}
      </ul>
     <div class="d-flex">
     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={input}/>
     <button class="btn btn-outline-success" type="submit" onClick={search}>Search</button>
     </div>
        
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar