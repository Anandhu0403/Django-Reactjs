import React, { useState } from 'react'
import{Link, useNavigate} from 'react-router-dom'
import { logout } from '../services/Apicalls'
function Navbar({islogin,onlogout}) {
  const[w,setw]=useState([])
  const navigate=useNavigate()
  function search(){
    navigate(`/search/?search=${w}`)
  }
  function eventset(event){
    setw(event.target.value)
    
  }
  async function handlelogout(){
    let res=await logout()
    if(res.status>199 && res.status<399)
      {
        localStorage.removeItem('token')
        onlogout()
        navigate('/')
      }
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link to="/" class='text-decoration-none'>
  
    <a class="navbar-brand" href="#">Recipe</a>  </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <Link to="/" class='text-decoration-none'>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li></Link>

        <Link to="/view" class="text-decoration-none">
        <li class="nav-item">
          <a class="nav-link" href="#">View</a>
        </li></Link>
        { islogin && (<>
        
          <li class="nav-item">
             <a class="nav-link" href="#" onClick={handlelogout}>Logout</a>
          </li>
        
        
        </>)}
        { !islogin && (<>
          <Link to="/login" class="text-decoration-none">
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
        </Link>
        <Link to="/register" class="text-decoration-none">
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
        </li></Link>
        </>)}

        
       
       
      </ul>
      <div className='d-flex'>

         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={eventset}/>
        <button class="btn btn-outline-success" type="submit" onClick={search}>Search</button>

      </div>
        
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar