import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchrecipe } from '../services/Apicalls'

function Search() {
const[recipe,setrecipe]=useState([])
const{search}=useLocation()
const queryParams=new URLSearchParams(search)
const w=queryParams.get('search')
async function searchallrecipe() {
    let res= await searchrecipe(w)
    setrecipe(res.data)
    console.log(res)

    
}
useEffect(()=>{searchallrecipe()},[])
  return (
    <div>
          <h2>Search results all recipes</h2>
        <div className='container'>

        {Array.isArray(recipe)? 
        
        <table class="table table-bordered border-4">
      
        <thead>
            <tr>
                <th>ID</th>
                <th>image</th>
                <th>Recipe name</th>
                <th>ingredients</th>
                <th>Instructions</th>
                <th>Meal type</th>
                <th>Cusine</th>
                
            </tr>
            </thead>
            <tbody>
            {recipe.map((s)=><tr>
            <td>{s.id}</td>
            <td><img src={s.image_url} height="100px" width="100px"></img></td>
            <td>{s.recipe_name}</td>
            <td>{s.ingredients}</td>
            <td>{s.instructions}</td>
            <td>{s.meal_type}</td>
            <td>{s.cusine}</td>
           
           
        
    
            
          </tr>)}
          </tbody>

        </table>
        
        :<h3>No results found</h3>}
       
        </div>
    </div>
  )
}

export default Search