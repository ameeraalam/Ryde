import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import styles from "./styles";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import DriverInfo from "../DriverInfo/DriverInfo";
import Chat from "../Chat/Chat";
import DriverView from "../DriverView/DriverView";
import Available from "../PassengerView/Available";
import Pending from "../PassengerView/Pending";
import RequestedRides from "../RequestedRides/RequestedRides";
import ContactUs from "../ContactUs/ContactUs";
import AvailableProfile from "../Profile/PassengerAvailableRideProfile";
import PassengerSearchProfile from "../Profile/PassengerSearchProfile.js";
import PendingProfile from "../Profile/PassengerPendingRideProfile";
import DriverProfile from "../Profile/DriverRideProfile";

import RidePosting from "../RidePosting/RidePosting";
import RideSearch from "../RideSearch/RideSearch";
import RideBrowser from "../RideBrowser/RideBrowser";

export default () => (
	<Router navigationBarStyle={styles.navbarContainer} titleStyle={styles.navbarTitle}>
		<Scene key = "root">
			<Scene key = "login" component = {Login} title = "Ryde"/>
			<Scene key = "chat" component = {Chat} hideNavBar/>
			<Scene key = "requestedRides" component = {RequestedRides} title = "Requests"/>
			<Scene key = "register" component = {Register} hideNavBar/>
			<Scene key = "driverInfo" component = {DriverInfo} title = "Ryde"/>
			<Scene key = "choice" component = {Choice} hideNavBar/>	
		  	<Scene key = "driverView" component = {DriverView} hideNavBar />
		 	<Scene key = "available" component = {Available} hideNavBar/>
			<Scene key = "contactUs" component = {ContactUs} hideNavBar/>
			<Scene key = "pending" component = {Pending} hideNavBar/>
			<Scene key = "availableProfile" component = {AvailableProfile} hideNavBar/>
			<Scene key = "passengerSearchProfile" component = {PassengerSearchProfile} hideNavBar />
			<Scene key = "pendingProfile" component = {PendingProfile} hideNavBar/>
			<Scene key = "driverRideProfile" component = {DriverProfile} hideNavBar />
			
			<Scene key = "ridePosting" component = {RidePosting} title = "Ryde"/>
			<Scene key = "rideSearch" component = {RideSearch} title = "Ryde"/>
			<Scene key = "rideBrowser" component = {RideBrowser} title = "Ryde"/>			
		</Scene>
	</Router>
);