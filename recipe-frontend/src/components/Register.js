import React, { useState } from 'react';
import { register } from '../services/Apicalls';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({first_name:'',last_name:'',email:'',password:'',username:''});
    const navigate=useNavigate()


    async function registeruser(event) {
        event.preventDefault();
            console.log(user)
            let res = await register(user);
            console.log(res);
            navigate('/login')
        
    }

    return (
        <div>
            <div className='container w-50'>
                <h2>Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={(event) => { setUser({ ...user, username: event.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            onChange={(event) => { setUser({ ...user, email: event.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={(event) => { setUser({ ...user, password: event.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            onChange={(event) => { setUser({ ...user, first_name: event.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            onChange={(event) => { setUser({ ...user, last_name: event.target.value }) }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={registeruser}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
