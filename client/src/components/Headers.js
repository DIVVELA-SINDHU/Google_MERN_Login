import React, { useEffect, useState } from 'react'
import './header.css'
import {NavLink} from 'react-router-dom'
// import logo from '../logo.svg';
import axios from 'axios';

const Headers = () => {
  const [udata,setUdata] = useState({});

  const getUser= async()=>{
    try {
      const response = await axios.get('http://localhost:3001/login/success',{withCredentials: true});
      console.log("Response received: ",response);
      setUdata(response.data.user);
    } catch (error) {
      console.log("error: ",error);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  const logout = ()=>{
    window.open("http://localhost:3001/logout","_self")
  }

  return (
    <>
    <header>
      <nav>
        <div className="left">
            <h1>Welcome</h1>
        </div>
        <div className="right">
            <ul>
              <li>
                <NavLink to='/'>
                  Home
                </NavLink>               
              </li>
              {
                Object?.keys(udata)?.length > 0 ?(
                  <>
                  <li>{udata?.displayName}</li>
                    <li>
                    <NavLink to='/dashboard'>
                        Dashboard
                      </NavLink>  
                    </li>
                    <li onClick={logout}>logout</li>
                    <li>
                      <img src={udata?.img} style={{width:"50px",borderRadius:"50%"}} alt="Logo"/>
                    </li>
                  </>
                ) : <li>
                    <NavLink to='/login'>
                        Login
                      </NavLink>  
                    </li>
              }              
            </ul>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Headers