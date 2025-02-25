import React, { useEffect, useState } from 'react'
import { getrecipe, updaterecipe } from '../services/Apicalls'
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {
    const[recipe,setrecipe]=useState({'image':null,'recipe_name':'','ingredients':'','instructions':'','meal_type':'','cusine':''})
    const {search}=useLocation()
    const queryParams=new URLSearchParams(search)
    const id=queryParams.get('id')
    const navigate=useNavigate()
    async function editrecipe(event){
        event.preventDefault()
        const urecipe={...recipe}
        if(typeof urecipe.image=='string')  //if we dont want to edit the image field delete img from books object
             delete urecipe.image              //deleting the img field from books obj
        let res= await updaterecipe(id,urecipe)    
         navigate('/view')

    }
async function displayrecipe() {
    let res = await getrecipe(id)
    let d = res.data
    setrecipe(d)
     }
 useEffect(()=>{displayrecipe()},[])    
  return (
    <div>
         <div class="container w-50 border mt-5 mb-5  shadow p-3 mb-5 bg-body rounded">
        <h3>Edit Recipe</h3>
        <form >
          <div  class="mb-3" >
            
            <img src={recipe.image} width='200px' height='200px' ></img>
            <input type='file' class="form-control"  onChange={(event)=>{setrecipe({...recipe,image:event.target.files[0]})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label" >Recipe Name</label>
            <input type="text" class="form-control" value={recipe.recipe_name}  onChange={(event)=>{setrecipe({...recipe,recipe_name:event.target.value})}}></input>
          </div>
          <div  class="mb-3">
            <label class="form-label">ingredients</label>
            <input type="text" class="form-control" value={recipe.ingredients} onChange={(event)=>{setrecipe({...recipe,ingredients:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Instructions</label>
            <input type="text" class="form-control" value={recipe.instructions} onChange={(event)=>{setrecipe({...recipe,instructions:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Meal type</label>
            <input type="text" class="form-control" value={recipe.meal_type} onChange={(event)=>{setrecipe({...recipe,meal_type:event.target.value})}}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Cusine</label>
            <input type="text" class="form-control" value={recipe.cusine} onChange={(event)=>{setrecipe({...recipe,cusine:event.target.value})}}></input>
          </div>
          
          <div class="mb-3">
            <input type="submit" class="btn btn-dark" onClick={editrecipe}></input>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Edit