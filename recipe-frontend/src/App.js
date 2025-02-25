import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import View from './components/View';
import Add from './components/Add';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Search from './components/Search';
import Register from './components/Register';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Review from './components/Review';

function App() {
  const[islogin,setlogin]=useState(false)
  function checkloginstatus(){
      let token=localStorage.getItem('token')
      setlogin(!!token)
  }
  function login(){
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
          <Route path='/detail' element={<Detail islogin={islogin}/>}></Route>
          <Route path='/edit' element={<Edit/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login  onlogin={checkloginstatus}/>}></Route>
          <Route path='/review' element={<Review/>}> </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
