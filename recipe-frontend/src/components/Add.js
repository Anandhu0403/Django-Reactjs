import React, { useState } from 'react'
import { postrecipe } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function Add() {
    const[recipe,setrecipe]=useState({'image':null,'recipe_name':'','ingredients':'','instructions':'','meal_type':'','cusine':''})
    const navigate=useNavigate()
    async function addrecipe(event) {
        event.preventDefault()
        let res=await postrecipe(recipe)
        navigate('/view')
    }
  return (
    <div>
        <div class="container w-50 border mt-5 mb-5  shadow p-3 mb-5 bg-body rounded">
        <h3>Add Recipes</h3>
        <form >
          <div  class="mb-3" >
            <label class="form-label">Image</label>
            <input type='file' class="form-control" onChange={(event)=>{setrecipe({...recipe,image:event.target.files[0]})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label" >Recipe Name</label>
            <input type="text" class="form-control"  onChange={(event)=>{setrecipe({...recipe,recipe_name:event.target.value})}}></input>
          </div>
          <div  class="mb-3">
            <label class="form-label">ingredients</label>
            <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,ingredients:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Instructions</label>
            <input type="text" class="form-control"  onChange={(event)=>{setrecipe({...recipe,instructions:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Meal type</label>
            <input type="text" class="form-control"  onChange={(event)=>{setrecipe({...recipe,meal_type:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Cusine</label>
            <input type="text" class="form-control"  onChange={(event)=>{setrecipe({...recipe,cusine:event.target.value})}}></input>
          </div>
          
          <div class="mb-3">
            <input type="submit" class="btn btn-dark" onClick={addrecipe}></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Add