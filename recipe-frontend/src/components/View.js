import React, { useEffect, useState } from 'react'
import { deleterecipe, getallrecipe } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function View() {
const navigate=useNavigate()    
const [recipe, setrecipe] = useState([])
 async function getrecipe() {
    let res = await getallrecipe()
    let d = res.data
    setrecipe(d)
 }
 function detail(i){
    navigate(`/detail/?id=${i}`)


 }
 function edit(i){
  navigate(`/edit/?id=${i}`)


}
 async function recipedelete(i){
    let res= await deleterecipe(i)
    if(res.status>199 && res.status<399){
        getrecipe()
      }
      else{
        alert('cant delete')
      }

 }
 useEffect(() => { getrecipe() }, [])
  return (
    <div>

        <h2>View all recipes</h2>
        <div className='container'>
        <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>ID</th>
                <th>image</th>
                <th>Recipe name</th>
                <th>ingredients</th>
                <th>Instructions</th>
                <th>Meal type</th>
                <th>Cusine</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {recipe.map((s)=><tr>
            <td>{s.id}</td>
            <td><img src={s.image} height="100px" width="100px"></img></td>
            <td>{s.recipe_name}</td>
            <td>{s.ingredients}</td>
            <td>{s.instructions}</td>
            <td>{s.meal_type}</td>
            <td>{s.cusine}</td>
           
            <td><button class="btn btn-secondary" onClick={()=>edit(s.id)}>Edit</button> <button  class="btn btn-success" onClick={()=>detail(s.id)}>Detail</button> <button  class="btn btn-danger" onClick={()=>recipedelete(s.id)}>Delete</button></td>
        
    
            
          </tr>)}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default View