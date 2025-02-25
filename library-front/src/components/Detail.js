import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getbookdetails } from '../services/Apicalls'
function Detail() {
    const {search}=useLocation()
    //console.log(search)
    const queryParams=new URLSearchParams(search) //{id:idvalue}
    const id=queryParams.get('id')
    const[books,setbook]=useState([])
    async function bookdetail(){
         let res=await getbookdetails(id) 
         let d=res.data
         setbook(d)
        
     
    }
  useEffect(()=>{bookdetail()},[]) 
  return (
    <div>



      <div class="container">
        <h2 class="text-center">Detail books</h2>
        <table class="table table-bordered table-active ">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Languages</th>
          
          </tr>
          <tr>
            <td><img src={books.image} height="100px" width="100px" alt='img'></img></td>
            <td>{books.title}</td>
            <td>{books.author}</td>
            <td>{books.price}</td>
            <td>{books.pages}</td>
            <td>{books.language}</td>
        
    
           
          </tr>
        </table>

      </div>
      </div>
    
  )
}

export default Detail