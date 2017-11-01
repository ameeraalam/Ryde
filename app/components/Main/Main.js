import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import styles from "./styles";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import DriverInfo from "../DriverInfo/DriverInfo";
import Chat from "../Chat/Chat";
import Available from "../PassengerView/Available"
import Pending from "../PassengerView/Pending";
import DriverView from "../DriverView/DriverView";
import ContactUs from '../ContactUs/ContactUs';

export default () => (
	<Router navigationBarStyle={styles.navbarContainer} titleStyle={styles.navbarTitle}>
		<Scene key = "root">
			<Scene key = "login" component = {Login} title = "Ryde"/>
			<Scene key = "register" component = {Register} hideNavBar = {true}/>
			<Scene key = "choice" component = {Choice} hideNavBar = {true}/>
			<Scene key = "driverInfo" component = {DriverInfo} title = "Ryde"/>
			<Scene key = "available" component = {Available} hideNavBar/>
			<Scene key = "pending" component = {Pending} hideNavBar/>
			<Scene key = "driverview" component = {DriverView} hideNavBar />
			<Scene key = "contactUs" component = {ContactUs} hideNavBar = {true}/>
			<Scene key = "chat" component = {Chat} title = "Ryde"/>
		</Scene>
	</Router>
);
