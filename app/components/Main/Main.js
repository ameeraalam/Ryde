import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import PassengerView from "../PassengerView/PassengerView"
import DriverView from "../DriverView/DriverView"
import Available from "../PassengerView/Available"
import Pending from "../PassengerView/Pending"
import AvailableProfile from "../Profile/PassengerAvailableRideProfile"
import PendingProfile from "../Profile/PassengerPendingRideProfile"
import DriverProfile from "../Profile/DriverRideProfile"

export default () => (
	<Router>
		<Scene key = "root">
		<Scene key = "choice" component = {Choice} title = "															Ryde"/>
		<Scene key = "login" component = {Login} title = "																						Ryde"/>
		<Scene key = "register" component = {Register} title = "															Ryde"/>
		<Scene key = "driverview" component = {DriverView} hideNavBar />
		<Scene key = "driverProfile" component = {DriverProfile} hideNavBar />
			<Scene key = "passengerview" component = {PassengerView} hideNavBar/>
		  <Scene key = "available" component = {Available} hideNavBar/>
			<Scene key = "availableProfile" component = {AvailableProfile} hideNavBar/>
			<Scene key = "pendingProfile" component = {PendingProfile} hideNavBar/>
			<Scene key = "pending" component = {Pending} hideNavBar/>
		</Scene>
	</Router>
);
