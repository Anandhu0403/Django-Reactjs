import React, { useEffect, useState } from 'react'
import { deleterecipe, getrecipe, getreview } from '../services/Apicalls'
import { useLocation, useNavigate } from 'react-router-dom'

function Detail({islogin}) {

 const {search}=useLocation()
 const queryParams=new URLSearchParams(search)   
 const id=queryParams.get('id')
 const navigate=useNavigate()
 const[recipe,setrecipe]=useState([])
 const[review,setreview]=useState([])
  async function detailrecipe(){
    let res= await  getrecipe(id)
    let d=res.data
    setrecipe(d)
  }  
  function edit(i){
    navigate(`/edit/?id=${i}`)
  }
  function recipedelete(i){
      let res=deleterecipe(i)
     navigate('/')
      
  }
  function reviewadd(i){
    console.log(i)
    navigate(`/review/?id=${i}`)

  }
  async function reviewshow(i){
    try{
      let res= await getreview(i)
      setreview(res.data)
    }
    catch{
      alert("No reviews yet! Be the first one to comment !!")
    }
   // console.log(i)
    
    
  } 
  useEffect(()=>{detailrecipe()},[])
  return (
    <div>
    <h2 className='mb-5 '>View Recipe</h2>
    <div className='container mx-auto'>
      <div className="card mb-3  shadow p-3 mb-5 bg-body rounded" style={{ maxWidth: '1150px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={recipe.image} className="img-fluid rounded-start" alt="..."  height="300px" width="500px" />
          </div>
          <div className="col-md-8">
            <div className="">
              <h2 className="card-title "><b>{recipe.recipe_name}</b></h2>
              <ul className="list-unstyled text-left">
                <li><b>Ingredients</b>:  {recipe.ingredients}</li>
                <li><b>Instructions</b>:  {recipe.instructions}</li>
                <li><b>Meal type</b>:  {recipe.meal_type}</li>
                <li><b>Cusine</b>:  {recipe.cusine}</li>
              </ul>
              <button class="btn btn-secondary" onClick={()=>edit(recipe.id)}>Edit</button>  <button  class="btn btn-danger" onClick={()=>recipedelete(recipe.id)}>Delete</button> 
            </div>
          </div>
        </div>
        <div>
          {islogin && (<>
            <button className='btn btn-dark me-3' onClick={()=>reviewadd(recipe.id)}>Add Review </button>
          </>)}
        
        <button className='btn btn-dark' onClick={()=>reviewshow(recipe.id)}>Show all review</button>
        </div>

          

      </div>
      <div className='container'>
            {review ? (
              <div>
                {review.map((s) => (
                  <div key={s.id}> 
                    <strong className="mt-3">{s.name}</strong>
                    <strong> Rated {'*'.repeat(s.rating)} </strong>
                    <strong>{s.comment} </strong>
                    <strong>Reviewed on {new Date(s.created).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <div>No reviews</div>
            )}
          </div>
    </div>
  </div>
  
  )
}

export default Detail