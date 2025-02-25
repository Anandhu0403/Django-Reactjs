import React, { useEffect, useState } from 'react'
import { deletebooks, getallbooks } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function View() {
  
 const [books,setbook]=useState([])
 const navigate=useNavigate()
  
 async function fetchbook(){
    let res=await getallbooks() 
    let d=res.data
    setbook(d)

  }
  function detail(i){
    console.log(i)
    navigate(`/detail/?id=${i}`)
  }
  function edit(i){
    console.log(i)
    navigate(`/edit/?id=${i}`)
  }
  async function deletebook(i){
    console.log(i) 
    let res=await deletebooks(i)
    if(res.status>199 && res.status<399){
      fetchbook()
    }
    else{
      alert('cant delete')
    }
  }
  useEffect(()=>{fetchbook()},[])// it will call fetchbooks when component is loaded
  return (
    <div>
      <div class="container">
        <h2 class="text-center">View books</h2>
        <table class="table table-bordered table-active ">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Languages</th>
            <th>Actions</th>
          </tr>
          {books.map((s)=><tr>
            <td><img src={s.image} height="100px" width="100px"></img></td>
            <td>{s.title}</td>
            <td>{s.author}</td>
            <td>{s.price}</td>
            <td>{s.pages}</td>
            <td>{s.language}</td>
            <td>
    
            <button class="btn btn-outline-primary me-2" onClick={()=>edit(s.id)}>Edit</button><button class="btn btn-success me-2" onClick={()=>detail(s.id)}>Detail</button><button class="btn btn-danger"  onClick={()=>deletebook(s.id)}>Delete</button></td>
          </tr>)}
        </table>

      </div>
    </div>
  )
}

export default View