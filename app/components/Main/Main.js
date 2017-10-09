import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import Available from "../PassengerView/Available"
import Pending from "../PassengerView/Pending"

export default () => (
	<Router>
		<Scene key = "root">
			<Scene key = "login" component = {Login} title = "																						Ryde"/>
			<Scene key = "register" component = {Register} title = "															Ryde"/>
			<Scene key = "choice" component = {Choice} title = "															Ryde"/>
			<Scene key = "available" component = {Available} title = "															Ryde"/>
			<Scene key = "pending" component = {Pending} title = "															Ryde"/>
		</Scene>
	</Router>
);
