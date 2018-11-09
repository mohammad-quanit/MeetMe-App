import React from "react";
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import '../../assets/bootstrap/bootstrap.min.css';
import Logo from '../../assets/logo.png'
import "./Direction.css";
import firebase from "../../config/firebase";
import swal from 'sweetalert';
/*global google*/

export default class Direction extends React.Component {
  constructor(props) {
    super(props);
  }

  getBack = () => {
    this.props.history.push("/meetingpoint");
  }

  meetingLocation() {
    this.props.history.push("/dateandtime");
  }


  render() {
    return (
      <div className="text-light Directions mx-auto">
        <img src={Logo} alt='logo' />
        <DirectionRenderMap />
        <button className="btn btn-info px-5 mt-2" onClick={this.meetingLocation.bind(this)}>Select</button>
        <br />
        <button className="btn btn-danger px-4 mt-1" onClick={this.getBack}>Back</button>
      </div>
    )
  }
}



class DirectionRenderMap extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const DirectionsComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?",
        loadingElement: <div className='loadingElement' />,
        containerElement: <div className='containerElement' />,
        mapElement: <div className='mapElement mx-auto border border-white rounded' />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const coords = JSON.parse(localStorage.getItem('coords'));
          const directions = JSON.parse(localStorage.getItem('MeetingLocation'))
          console.log(directions);
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(coords.latitude, coords.longitude),
            destination: new google.maps.LatLng(directions.meetingLocationCoords.latitude, directions.meetingLocationCoords.longitude),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: { ...result },
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={14}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
      </GoogleMap>
    );
    return (
      <DirectionsComponent
      />
    )
  }
}













// const center = JSON.parse(localStorage.getItem('coords'));

// <MyMapComponent
// 					isMarkerShown
// 					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiVBj3s1rlQRQMWIR24RMii0qLNQvmGm8&v=3.exp&libraries=geometry,drawing,places"
// 					loadingElement={<div style={{ height: `100%` }} />}
// 					containerElement={<div style={{ height: `600px` }} />}
// 					mapElement={<div style={{ height: `100%` }} />}
// 					directions={directions}
// 				/>
// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
// 	<GoogleMap
//     defaultZoom={15}
//     center={{ lat: center.latitude, lng: center.longitude }}
// 	>
// 		{/* <Marker position={{ lat: center.latitude, lng: center.longitude }} /> */}
// 		{/* <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} /> */}

// 		{props.directions && <DirectionsRenderer directions={props.directions} />}
// 	</GoogleMap>
// ))