import React, { useState } from 'react'
import { postbooks } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'
function Add() {
  const[books,setbook]=useState({title:'',author:'',price:'',pages:'',language:'',image:null})
  const navigate=useNavigate()
  async function addbook(event){
    event.preventDefault()
    let res=await postbooks(books)
    console.log(res)
    navigate('/view')
  }
  return (
    <div>
      <div class="container w-50 border mt-5 mb-5">
        <h3>Add books</h3>
        <form >
          <div  class="mb-3" >
            <label class="form-label">Image</label>
            <input type='file' class="form-control" onChange={(event)=>{setbook({...books,image:event.target.files[0]})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label" >title</label>
            <input type="text" class="form-control"  onChange={(event)=>{setbook({...books,title:event.target.value})}}></input>
          </div>
          <div  class="mb-3">
            <label class="form-label">author</label>
            <input type="text" class="form-control" onChange={(event)=>{setbook({...books,author:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input type="number" class="form-control"  onChange={(event)=>{setbook({...books,price:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Pages</label>
            <input type="number" class="form-control"  onChange={(event)=>{setbook({...books,pages:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Language</label>
            <input type="text" class="form-control"  onChange={(event)=>{setbook({...books,language:event.target.value})}}></input>
          </div>
          
          <div class="mb-3">
            <input type="submit" class="btn btn-dark" onClick={addbook}></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Add