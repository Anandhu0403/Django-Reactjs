import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getbookdetails, updatebooks } from '../services/Apicalls'

function Edit() {
    const[books,setbook]=useState({title:'',author:'',price:'',pages:'',language:'',image:null})
    const navigate=useNavigate()
    const {search}=useLocation()
    //console.log(search)
    const queryParams=new URLSearchParams(search) //{id:idvalue}
    const id=queryParams.get('id')
    async function fetchbook(){
        let res=await getbookdetails(id)
        let d=res.data
        setbook(d)
      }
    async function submitbtn(event){
         event.preventDefault()
         console.log(books)
         const ubook={...books}
         if(typeof ubook.image=='string')  //if we dont want to edit the image field delete img from books object
            delete ubook.image              //deleting the img field from books obj
            console.log(ubook) 
        let res= await updatebooks(id,ubook)    
        console.log(res)
        navigate('/view')
    }  
  useEffect(()=>{fetchbook()},[])     
  return (
    <div>
        <div class="container w-50 border mt-5 mb-5">
        <h3>Edit books</h3>
        <form onSubmit={submitbtn}>
          <div  class="mb-3" >
            <label class="form-label">Current Image</label>
            <img src={books.image} width="100px" height="100px"></img>
            <input type='file' class="form-control"  onChange={(event)=>{setbook({...books,image:event.target.files[0]})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label" >title</label>
            <input type="text" class="form-control" value={books.title} onChange={(event)=>{setbook({...books,title:event.target.value})}}></input>
          </div>
          <div  class="mb-3">
            <label class="form-label">author</label>
            <input type="text" class="form-control"  value={books.author} onChange={(event)=>{setbook({...books,author:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input type="number" class="form-control" value={books.price} onChange={(event)=>{setbook({...books,price:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Pages</label>
            <input type="number" class="form-control" value={books.pages} onChange={(event)=>{setbook({...books,pages:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Language</label>
            <input type="text" class="form-control"   value={books.language} onChange={(event)=>{setbook({...books,language:event.target.value})}}></input>
          </div>
          
          <div class="mb-3">
            <input type="submit" class="btn btn-dark"></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Edit