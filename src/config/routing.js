import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FbLogin from "../components/FbLogin/FbLogin";
import UserDetails from "../components/Details/UserDetails";
import Photos from "../components/Photos/Photos";
import Beverages from "../components/Beverages/Beverages";
import CurrentLocation from "../components/Location/Location";
import Dashboard from "../components/Dashboard/Dashboard";
import Meeting from "../components/Meeting/Meeting";
import MeetingPoint from "../components/MeetingPoint/MeetingPoint";
import DateAndTime from "../components/DateAndTime/DateAndTime";
import Direction from "../components/Directions/Direction";
import _404 from "../components/404/404";


const Routers = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={FbLogin} />
          <Route path="/details" component={UserDetails} />
          <Route path="/photos" component={Photos} />
          <Route path="/beverages" component={Beverages} />
          <Route path="/location" component={CurrentLocation} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/meeting" component={Meeting} />
          <Route path="/meetingpoint" component={MeetingPoint} />
          <Route path="/dateandtime" component={DateAndTime} />
          <Route path="/direction" component={Direction} />
          <Route component={_404} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default Routers



{/* <div className="text-light MeetingPoint">
				<img src={Logo} alt='logo' />
				<input type="text" placeholder="Search Location" className="form-control col-md-12 mt-5" id="txtSearch" />
				<button className="btn btn-primary float-right mt-2" onClick={this.search}>Search</button>
				<br/>
				<hr />
				{flag && location.map((value, index) => {
					return <div className="card mt-5 border border-0">
						<div className="card-body" style={{ backgroundColor: '#6E4B92' }}>
							<h6 className="card-title text-light float-left">{value.name}</h6>
							<button className="btn btn-success float-right btn-sm" onClick={this.select.bind(this, index)}>Select</button>
						</div>
					</div>
				})}

				{!flag && nearestLocation.map((val, ind) => {
					return <div className="card mt-5 border border-0">
						<div className="card-body" style={{ backgroundColor: '#6E4B92' }}>
							<h6 className="card-title text-light float-left">{val.name}</h6>
							<button className="btn btn-success float-right btn-sm" onClick={this.selectNearest.bind(this, ind)}>Select</button>
						</div>
					</div>
				})}
			</div> */}