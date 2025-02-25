import React, { useEffect, useState } from 'react'
import { getallrecipe } from '../services/Apicalls'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [recipe, setrecipe] = useState([])
  const navigate=useNavigate()
  async function getrecipe() {
    let res = await getallrecipe()
    let d = res.data
    setrecipe(d)


  }
  function detail(i){
    navigate(`/detail/?id=${i}`)
    

  }
  function addrecp(){
    navigate('/add')
  }
  useEffect(() => { getrecipe() }, [])
  return (
    <div>
      <h2 class="text-center">Available recipes</h2>
      <div class="container">
    
          <div class="row">
          {recipe.map((s) =>
            <div class="col-4">


              <div class="card mb-4 mt-4 shadow p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
              
                <img src={s.image} class="card-img-top" alt="img" style={{height:'250px'}} onClick={()=>detail(s.id)}/>
                <div class="card-body">
                  <p class="card-text">{s.recipe_name}</p>
                </div>
              </div>

            </div>
                 )}

          </div>
   
      </div>
      <div class="mb-5"><button class="btn btn-dark" onClick={addrecp}>Add new Recipe</button></div>
    </div>
  )
}

export default Home