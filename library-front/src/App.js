import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import View from './components/View';
import Add from './components/Add';
import Register from './components/Register';
import Login from './components/Login';
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import Detail from './components/Detail';
import Edit from './components/Edit';
import Search from './components/Search';
import { useEffect, useState } from 'react';

function App() {
  const[islogin,setlogin]=useState(false)
  function checkloginstatus(){
    const token=localStorage.getItem('token')
    setlogin(!!token)
  }
  function login(){
    console.log(islogin)
    checkloginstatus()
  }
  useEffect(()=>{checkloginstatus()},[])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar islogin={islogin} onlogout={checkloginstatus}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/view' element={<View/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login onlogin={checkloginstatus}/>}></Route>
        <Route path='/detail' element={<Detail/>}></Route>
        <Route path='/edit' element={<Edit/>}></Route>
        <Route path='/search' element={<Search/>}></Route>

        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
