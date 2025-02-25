// Get,post,put,delete,getbyid
import axios from 'axios'
//axios.methodname(baseurl,data,Params,headers)

export async function getallbooks(){
    let token=localStorage.getItem('token')
    const h={'Authorization':token}
   return await axios.get(`http://127.0.0.1:8000/books/`,{headers:h})
}
//await response return waiting used iwth async
//return type-promise object
//pending initial state
//resolved fulfiled it returns data response
//rejected returns eroor response
export async function postbooks(data){
    let token=localStorage.getItem('token')
    const h={'Content-type':'multipart/form-data','Authorization':token}
    return await axios.post(`http://127.0.0.1:8000/books/`,data,{headers:h})
}   
export async function getbookdetails(id){
    let token=localStorage.getItem('token')
    const h={'Authorization':token}
    return await axios.get(`http://127.0.0.1:8000/books/${id}/`,{headers:h})
}
export async function updatebooks(id,data){
    let token=localStorage.getItem('token')
    const h={'Content-type':'multipart/form-data','Authorization':token}
    return await axios.put(`http://127.0.0.1:8000/books/${id}/`,data,{headers:h})
}
export async function deletebooks(id){
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    return await axios.delete(`http://127.0.0.1:8000/books/${id}/`,{headers:h})
}

export async function searchbook(w) {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    let p={'search':w}  //json object wheer key is search
    return await axios.get(`http://127.0.0.1:8000/search`,{params:p},{headers:h})// sending json object as queryparameter to backend api request
    
}

export async function register(data) {
    return await axios.post(`http://127.0.0.1:8000/user/`,data)
}
export async function loginuser(data) {
    return await axios.post(`http://127.0.0.1:8000/api-token-auth/`,data)
}

export async function logoutuser(data) {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    //console.log(token)
    return await axios.get(`http://127.0.0.1:8000/logout`,{headers:h})
}