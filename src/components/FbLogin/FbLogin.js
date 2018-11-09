import React from "react";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
// import UserDetails from "../Details/UserDetails";
import Logo from '../../assets/logo.png';
import "./FbLogin.css";
import '../../assets/bootstrap/bootstrap.min.css';
import swal from 'sweetalert';


const provider = new firebase.auth.FacebookAuthProvider();

export default class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  //Login with Facebook
  login = e => {
    document.getElementById('btnFbLogin').innerHTML = "";
    const button = document.getElementById('btnFbLogin');
    const loader = document.createElement('i');
    loader.setAttribute('id', 'loading');
    loader.setAttribute('class', 'fas fa-spinner')
    button.appendChild(loader);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // swal({
        //   title: "Login Successfully",
        //   icon: "success",
        //   button: "Ok",
        // });
        localStorage.setItem('user_id', result.user.uid);
        localStorage.setItem('fullName', result.user.displayName);
        this.setState({
          login: true
        });
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Login Failed",
          text: "Check Your Internet Connection & Try Again",
          icon: "warning",
          button: "Ok",
          dangerMode: true
        });
        document.getElementById('loading').style.display = "none";
        document.getElementById('btnFbLogin').innerHTML = "Login with Facebook";
      });
  };

  render() {
    const { login } = this.state;
    return (
      <div className="Login">
        {/* {user && setTimeout(() => { this.props.history.push('/dashboard') }, 1000)} */}
        <img src={Logo} alt="Logo" />
        <h1 className="text-light">Welcome</h1>
        <p className="text-light">MeetMe is the best place to Discover & meet new People</p>
        <br />
        <button type="button" id="btnFbLogin" className="btn btn-info px-5" onClick={this.login}>Connect with Facebook</button>
        {login && <Redirect to={{ pathname: "/details" }} />}
      </div>
    );
  }
}
