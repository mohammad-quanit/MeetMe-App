import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png'
import "./Details.css";
import '../../assets/bootstrap/bootstrap.min.css';
import firebase from "../../config/firebase";
import swal from 'sweetalert';


export default class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      phone: ""
    }
    this.sendUserDetails = this.sendUserDetails.bind(this);
  }

  // componentDidMount(){
  //   const user_id = localStorage.getItem('user_id');

  //   firebase.firestore().collection('users').doc(user_id).get().then(doc => {
  //     // console.log(doc.data().registerd);
  //     doc.data().registerd ? this.props.history.push("/dashboard") : this.props.history.push("/details")
  //   })
  // }

  sendUserDetails(){
   
    const {nickname , phone} = this.state;
    const user_id = localStorage.getItem('user_id');
    const fullName = localStorage.getItem('fullName');

    
    document.getElementById('btnAddDetails').innerHTML = "";
    const button = document.getElementById('btnAddDetails');
    const loader = document.createElement('i');
    loader.setAttribute('id', 'loading');
    loader.setAttribute('class', 'fas fa-spinner')
    button.appendChild(loader);

    firebase.firestore().collection('users').doc(user_id).set({
      fullName,
      nickname,
      phone,
      uid : user_id
    }).then(res => {
      // swal({
      //   title: "Details Added Successfully",
      //   icon: "success",
      //   button: "Ok", 
      // });
      localStorage.setItem('nickname',nickname);
      localStorage.setItem('phone',phone);
      this.props.history.push("/photos");
    }).catch(err => {
      swal({
        title: "Errow While Adding",
        text: "Check Your Internet Connection & Try Again",
        icon: "warning",
        button: "Ok",
        dangerMode: true
      });
      document.getElementById('loading').style.display = "none";
      document.getElementById('btnAddDetails').innerHTML = "Next";
    });
  }

  render() {
    const { nickname, phone } = this.state;
    const username = localStorage.getItem('fullName');
    return (
      <div className="Details">
        <img src={Logo} alt="Logo" />
        <p className="text-light">Welcome, <b>{username}</b></p>
        <br />
        <form className="form-group mx-auto">
          <input required className="form-control mb-3" type="text" placeholder="Enter Nickname" onChange={(e) => this.setState({ nickname: e.target.value })} />
          <input required className="form-control mb-3" type="tel" placeholder="Enter Phone" onChange={(e) => this.setState({ phone: e.target.value })} />      
          {nickname && phone &&
            <span id="btnAddDetails" className="btn btn-info px-5" onClick={this.sendUserDetails}>Next</span>
          }
          {/* {nickname && phone && <NavLink to={{ pathname: "/photos" }} >
            <span className="btn btn-primary px-5">Next</span>
          </NavLink>} */}
        </form>
      </div>
    );
  }
}
