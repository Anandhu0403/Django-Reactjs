import axios from 'axios'

export async function getallrecipe(){
   return await axios.get('http://127.0.0.1:8000/recipe/')
}
export async function postrecipe(data) {
     const h={'Content-type':'multipart/form-data'}
    return await axios.post('http://127.0.0.1:8000/recipe/',data,{headers:h})
    
}
export async function getrecipe(id) {
    return await axios.get(`http://127.0.0.1:8000/recipe/${id}/`)
    
}
export async function deleterecipe(id) {
    return await axios.delete(`http://127.0.0.1:8000/recipe/${id}/`)
    
    
}
export async function updaterecipe(id,data) 
{
    return await axios.put(`http://127.0.0.1:8000/recipe/${id}/`,data)
}

export async function searchrecipe(w) 
{
    let p={'search':w}
    return await axios.get(`http://127.0.0.1:8000/search/`,{params:p})
}
export async function register(data) {
    return await axios.post(`http://127.0.0.1:8000/users/`,data)
}

export async function loginuser(data) {
    return await axios.post(`http://127.0.0.1:8000/api-token-auth/`,data)
}


export async function logout(data) {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    //console.log(token)
    return await axios.get(`http://127.0.0.1:8000/logout`,{headers:h})
}

export async function addreview(data) {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    return await axios.post(`http://127.0.0.1:8000/create/`,data,{headers:h})
}

export async function getreview(id) {
    return await axios.get(`http://127.0.0.1:8000/allreviews/${id}`)
}