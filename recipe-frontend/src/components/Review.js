import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addreview } from '../services/Apicalls'

function Review() {
    const navigate=useNavigate()
    const[review,setreview]=useState({id:'',rating:'',comment:''})
    const {search}=useLocation()
    const queryParams=new URLSearchParams(search)
    const id=queryParams.get('id')
   async function submit(event){
        event.preventDefault()
        const review1={...review,id:id}
        //console.log(review1)
        let res= await addreview(review1)
       // console.log(res)
       navigate(`/detail/?id=${id}`)

    }
  return (
    <div>
      <h2>Drop a review</h2>
        <div className='container mt-5 w-50 shadow p-3 mb-5 bg-body rounded'>
              <form>
                  <div class="form-floating mt-3 mb-3">
                      <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} onChange={(event)=>{setreview({...review,comment:event.target.value})}}></textarea>
                      <label for="floatingTextarea2">Add Review</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingPassword" placeholder="Rating(out of 5)" min="1" max="5"  onChange={(event)=>{setreview({...review,rating:event.target.value})}}/>
                    <label for="floatingPassword">Rating(out of 5)</label>
                    </div>
                  <div>
                    <input type="submit" className='btn btn-dark' onClick={submit}></input>
                  </div>
              </form>

        </div>
    </div>
  )
}

export default Review