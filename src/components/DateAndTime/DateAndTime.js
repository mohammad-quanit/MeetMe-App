import React from "react";
// import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png'
import "./DateAndTime.css";
import firebase from "../../config/firebase";
import '../../assets/bootstrap/bootstrap.min.css';
import swal from 'sweetalert';

export default class DateAndTime extends React.Component {
	constructor(props) {
		super(props);

		this.doneMeeting = this.doneMeeting.bind(this);
	}

	doneMeeting() {
		const name = localStorage.getItem('fullName');
		const user_id = localStorage.getItem('user_id');
		const parseMeetingUserId = JSON.parse(localStorage.getItem('MeetingUser'));
		const meetingUserId = parseMeetingUserId.uid;
		const parseLocations = JSON.parse(localStorage.getItem('MeetingLocation'));
		const meetingLocationName = parseLocations.meetingLocationName;
		const meetingLocationCoords = parseLocations.meetingLocationCoords;
		const meetingDate = document.getElementById('txtDate').value;
		const meetingTime = document.getElementById('txtTime').value;
		const status = "Pending";

		swal({
			title: "Are you sure?",
			text: name + " Did You Really Want To Meet Him/Her.",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					firebase.firestore().collection('meetings').add({
						user_id,
						meetingUserId,
						meetingLocationName,
						meetingLocationCoords,
						meetingDate,
						meetingTime,
						status
					}).then(() => {
						swal("Congratulations " + name, {
							title: "Meeting Request Sent Successfully",
							icon: "success",
						});
						this.props.history.push("/dashboard");
					})
				} else {
					swal("Operation Cancelled", {
						icon: "success"
					});
				}
			});
	}

	render() {
		return (
			<div className="text-dark DateAndTime">
				<img src={Logo} alt='logo' />
				<input type="date" className="form-control col-md-12 mt-5" id="txtDate" />
				<input type="time" className="form-control col-md-12 mt-2" id="txtTime" />
				<button className="btn btn-primary float-right mt-3 px-5" onClick={this.doneMeeting}>Done</button>
			</div>
		)
	}
}