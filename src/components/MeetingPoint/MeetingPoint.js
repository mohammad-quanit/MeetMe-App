import React from "react";
// import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png'
import "./MeetingPoint.css";
import firebase from "../../config/firebase";
import '../../assets/bootstrap/bootstrap.min.css';
import swal from 'sweetalert';

export default class MeetingPoint extends React.Component {
	constructor(props) {
		super(props);

		this.state = ({
			location : null,
			coords: null,
			flag: false
		})

		this.search = this.search.bind(this);
		this.select = this.select.bind(this);
		this.selectNearest = this.selectNearest.bind(this);
		this.directionNearest = this.directionNearest.bind(this);
		this.direction = this.direction.bind(this);

		//Getting Coordinates
		const user_id = localStorage.getItem('user_id');
		firebase.firestore().collection('users').doc(user_id).get().then(result => {
			// console.log(result.data().coords.latitude);
			// console.log(result.data().coords.longitude);
			this.setState({
				coords: result.data().coords
			})
		})

		// //Getting Nearest 3 Locations
		// fetch('https://api.foursquare.com/v2/venues/search?client_id=MGPF54DCITXMHDEET2CSRSR01GSCFTGV24AKNC5TL4ZEV1K1&client_secret=UU4SDRIRFIB1M3GEJTLWLKBLJUACSFHGT3Q0QCS1NZDAJ20T&v=20180323&limit=3&ll=24.87,67.03')
    	// 	.then(res => res.json())
    	// 	.then(data => {
		// 		  console.log("Nearest->",data.response.venues);
		// 		  this.setState({
		// 			  nearestFlag : true,
		// 			  nearestLocation : data.response.venues
		// 		  })
    	// 	});	
		}

	search() {
		const { coords , location } = this.state;
		const txtSearch = document.getElementById('txtSearch');
		const searchingAPI = 'https://api.foursquare.com/v2/venues/search?client_id=MGPF54DCITXMHDEET2CSRSR01GSCFTGV24AKNC5TL4ZEV1K1&client_secret=UU4SDRIRFIB1M3GEJTLWLKBLJUACSFHGT3Q0QCS1NZDAJ20T&v=20180323&ll=' + coords.latitude + ',' + coords.longitude + '&query=' + txtSearch.value;
		if (txtSearch.value) {
			fetch(searchingAPI)
				.then(res => res.json())
				.then(data => {
					// console.log("========>",data.response.venues);
					this.setState({
						flag: true,
						location : data.response.venues
					})
				}).catch(error => {
					this.setState({
						flag : false
					})
				})
		}
		else {
			swal({
				title: "Invalid Input",
				text: "Search Field Can't Be Empty!",
				icon: "warning",
			});
		}
	}

	select(index){
		const {location} = this.state;
		const meetingLocation = {
			meetingLocationName : location[index].name,
			meetingLocationCoords : {
				latitude : location[index].location.lat,
				longitude : location[index].location.lng
			}
		}
		swal({
			title: "Are you sure?",
			text: "Did You Really Want To Select " + location[index].name,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					swal("Now Set Meeting Date & Time", {
						title: "Location Selected",
						icon: "success",
					});
					
					localStorage.setItem('MeetingLocation',JSON.stringify(meetingLocation));
					this.props.history.push("/dateandtime");
				} else {
					swal("Cancel Successfully", {
						icon: "success"
					});				
				}
			});
	}

	direction(index){
		const {location} = this.state;
		// console.log(location[index]);
		const meetingLocation = {
			meetingLocationName : location[index].name,
			meetingLocationCoords : {
				latitude : location[index].location.lat,
				longitude : location[index].location.lng
			}
		}
		localStorage.setItem('MeetingLocation',JSON.stringify(meetingLocation));
		this.props.history.push("/direction");
	}

	selectNearest(ind){
		const nearestLocation = JSON.parse(localStorage.getItem('nearestLocations'));
		const meetingLocation = {
			meetingLocationName : nearestLocation[ind].name,
			meetingLocationCoords : {
				latitude : nearestLocation[ind].location.lat,
				longitude : nearestLocation[ind].location.lng
			}
		}
		swal({
			title: "Are you sure?",
			text: "Did You Really Want To Select " + nearestLocation[ind].name,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					swal("Now Set Meeting Date & Time", {
						title: "Location Selected",
						icon: "success",
					});
					
					localStorage.setItem('MeetingLocation',JSON.stringify(meetingLocation));
					this.props.history.push("/dateandtime");
				} else {
					swal("Cancel Successfully", {
						icon: "success"
					});				
				}
			});
	}

	directionNearest(ind){
		const nearestLocation = JSON.parse(localStorage.getItem('nearestLocations'));
		// console.log(nearestLocation[ind]);
		const meetingLocation = {
			meetingLocationName : nearestLocation[ind].name,
			meetingLocationCoords : {
				latitude : nearestLocation[ind].location.lat,
				longitude : nearestLocation[ind].location.lng
			}
		}
		// console.log(meetingLocation);

		localStorage.setItem('MeetingLocation',JSON.stringify(meetingLocation));
		this.props.history.push("/direction");
	}

	render() {
		const {  flag , location } = this.state;
		const nearestLocation = JSON.parse(localStorage.getItem('nearestLocations'));
		return (
			<div className="text-light MeetingPoint">
				<img src={Logo} alt='logo' />
				<input type="text" placeholder="Search Location" className="form-control col-md-12 mt-5" id="txtSearch" />
				<button className="btn btn-primary float-right mt-2" onClick={this.search}>Search</button>
				<br />
				{flag && location.map((value,index) => {
				return	<div className="card mt-5 border border-0">
						<div className="card-body" style={{ backgroundColor: '#6E4B92' }}>
							<h6 className="text-light card-title float-left">{value.name}</h6>
							<button className="btn btn-danger float-right btn-sm ml-1" onClick={this.direction.bind(this, index)}>Direction</button>
							<button className="btn btn-success float-right btn-sm px-3" onClick={this.select.bind(this, index)}>Select</button>
						</div>
					</div>
				})}

				{!flag && nearestLocation.map((val,ind) => {
				return	<div className="card mt-5 border border-0">
						<div className="card-body" style={{ backgroundColor: '#6E4B92' }}>
							<h6 className="text-light card-title float-left">{val.name}</h6>
							<button className="btn btn-danger float-right btn-sm ml-1" onClick={this.directionNearest.bind(this, ind)}>Direction</button>
							<button className="btn btn-success float-right btn-sm px-3" onClick={this.selectNearest.bind(this, ind)}>Select</button>						
						</div>					
					</div>
				})}
			</div>
		)
	}
}






























