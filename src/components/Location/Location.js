import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { NavLink } from "react-router-dom";
import firebase from "../../config/firebase";
import '../../assets/bootstrap/bootstrap.min.css';
import Logo from '../../assets/logo.png';
import "./Location.css";
import swal from 'sweetalert';

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

//Map Component
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      center={{
        lat: props.coords.latitude,
        lng: props.coords.longitude
      }}
      defaultZoom={15}
    >
      {props.isMarkerShown && (
        <Marker
          draggable={true}
          position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
          onDragEnd={pos => {
            props.updateCoords(pos.latLng.lat(), pos.latLng.lng());
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default class CurrentLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      coords: null
    };
    this.updateCoords = this.updateCoords.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  submitData(){
    const {coords} = this.state;
    // console.log("After Click ====>" , coords.latitude);
    const user_id = localStorage.getItem('user_id');

    document.getElementById('btnAddLocation').innerHTML = "";
    const button = document.getElementById('btnAddLocation');
    const loader = document.createElement('i');
    loader.setAttribute('id', 'loading');
    loader.setAttribute('class', 'fas fa-spinner')
    button.appendChild(loader);

    firebase.firestore().collection('users').doc(user_id).update({
      coords : {latitude : coords.latitude, longitude : coords.longitude},
      registerd : true
    }).then(resp => {
      localStorage.setItem('coords',JSON.stringify(coords));
      swal({
        title: "Registration Successfully",
        icon: "success",
        button: "Done", 
      });
      this.props.history.push("/dashboard");
    }).catch(err => {
      swal({
        title: "Errow While Registration",
        text: "Check Your Internet Connection & Try Again",
        icon: "warning",
        button: "Ok",
        dangerMode: true
      });
      document.getElementById('loading').style.display = "none";
      document.getElementById('btnAddLocation').innerHTML = "Done";
    });
  }

  // getting current Position
  componentDidMount() {
    this.setPosition();
    console.log(this.state.coords);
  }
  
  //setting current position
  setPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords });
    });
  };

  updateCoords(latitude, longitude) {
    this.setState({ coords: { latitude, longitude } });
  }

  render(){
    let { coords } = this.state;
    // console.log("=======>",coords);
    //getting coords array into local storage
    // var user = JSON.parse(localStorage.getItem('user'));
    // user['coords'] = coords;
    // localStorage.setItem('user', JSON.stringify(user));
    console.log(coords)
    return (
      <div className='location-div'>
        <img src={Logo} alt="Logo" />
        <br />
        {coords && (
          <div className='border border-white rounded shadow-lg'>
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "500px" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              coords={coords}
              updateCoords={this.updateCoords}
            />
          </div>
        )}
        <br />
        {/* <NavLink to={{ pathname: "/dashboard" }}><button className='btn'>Next</button></NavLink> */}
        <button id="btnAddLocation" onClick={this.submitData} className='btn btn-info px-5'>Done</button>
      </div>
    );
  }
}
