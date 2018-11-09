import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "../SignOut/SignOut";
import firebase from "../../config/firebase";
import Logo from '../../assets/logo.png'
import "./Dashboard.css";
import '../../assets/bootstrap/bootstrap.min.css';

export default class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }

    const coords = JSON.parse(localStorage.getItem('coords'));

    //Getting Nearest 3 Locations
    fetch('https://api.foursquare.com/v2/venues/search?client_id=MGPF54DCITXMHDEET2CSRSR01GSCFTGV24AKNC5TL4ZEV1K1&client_secret=UU4SDRIRFIB1M3GEJTLWLKBLJUACSFHGT3Q0QCS1NZDAJ20T&v=20180323&limit=3&ll=' + coords.latitude + ',' + coords.longitude)
      .then(res => res.json())
      .then(data => {
        // console.log("Nearest->", data.response.venues);
        localStorage.setItem('nearestLocations', JSON.stringify(data.response.venues));
      });

    this.getUserData = this.getUserData.bind(this);
    this.getMatchedUsers = this.getMatchedUsers.bind(this);
  }

  componentDidMount() {
    this.getUserData();
    this.getMatchedUsers();
  }

  getUserData() {
    const user_id = localStorage.getItem('user_id');
    firebase.firestore().collection('users').doc(user_id).get().then(res => {
      localStorage.setItem('fullName', res.data().fullName);
      this.setState({ name: res.data().fullName })
    })
  }

  getMatchedUsers() {
    const users = [];
    const user_id = localStorage.getItem('user_id');
    // console.log('Current User =>',user_id);
    firebase.firestore().collection('users').get().then(res => {
      res.forEach(doc => {
        // localStorage.setItem('matchedUsers',doc.data());
        // console.log(doc.data().uid);
        if (doc.data().uid != user_id) {
          // console.log("Meeters",doc.data().uid);
          // console.log(doc.data());
          users.push(doc.data());
        }
      })
      // console.log(users);
      localStorage.setItem('MatchedUsers', JSON.stringify(users));
    })
  }

  render() {
    const { name } = this.state;



    return (
      <div className="pt-5 pr-3 Dashboard">
        {!localStorage.getItem('user_id') && this.props.history.push("/")}
        <div className='float-right'><SignOut /></div>
        <div className='float-left'><img src={Logo} alt='logo' /></div>
        <br />
        <div>
          <h3 className="text-light">{name}, you haven't done any meeting yet</h3>
          <br />
          <NavLink to='/meeting'><button className='btn btn-info px-5'>Set a Meeting</button></NavLink>
        </div>
      </div>
    );
  }
}
