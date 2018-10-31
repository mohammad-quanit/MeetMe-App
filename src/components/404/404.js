import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png'

const style404 = {
  backgroundColor: "#6E4B92",
  width: '100%',
  minHeight: '100vh',
  textAlign: 'center',
  paddingTop: '10%',
  fontFamily: 'Tahoma',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white'
}


const _404 = (props) => {
  return (
    <div style={style404} className="404">
      <img src={Logo} alt='404'/>
      <h1>404</h1>
      <p>The page you are trying to access, does not exist!</p>
      <NavLink to="/" activeStyle={{color: "white"}}>Click here to go Home Page</NavLink>
    </div>
  );
}

export default _404;