import React from "react";
import firebase from "../../config/firebase";
import { NavLink } from "react-router-dom";
import '../../assets/bootstrap/bootstrap.min.css';


export default class SignOutButton extends React.Component {
  constructor() {
    super();
    this.state = {
      login: true
    };
  }

  signOut = () => {
    firebase.auth().signOut();
    localStorage.removeItem('user_id');
    this.setState({ login: false })
  }

  render() {
    return (
      <div>
        {/* {!this.state.login && console.log(this.props)} */}
        <NavLink to='/'><button className="btn btn-info float-right" onClick={this.signOut}>Logout</button></NavLink>
      </div>
    );
  }
}
