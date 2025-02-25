import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchbook } from '../services/Apicalls'

function Search() {
  const {search}=useLocation()
  const queryParams=new URLSearchParams(search) //{id:idvalue}
  const w=queryParams.get('search')
  console.log(w)
   const [books,setbook]=useState([])
  async function searchbooks(){
    let res= await searchbook(w)
    console.log(res)
    let d=res.data
    setbook(d)
  }
  useEffect(()=>{searchbooks()},[w])
  return (
    <div>
      <div class="container">
        <h2 class="text-center">Search books</h2>
        {Array.isArray(books)?<div> <table class="table table-bordered table-active ">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Languages</th>
          
          </tr>
          {books.map((s)=><tr>
            <td><img src={s.image} height="100px" width="100px" alt="image"></img></td>
            <td>{s.title}</td>
            <td>{s.author}</td>
            <td>{s.price}</td>
            <td>{s.pages}</td>
            <td>{s.language}</td>
          </tr>)}
        </table></div>:<h2>No result found</h2>}

      </div>
      </div>
  
  )
}

export default Search