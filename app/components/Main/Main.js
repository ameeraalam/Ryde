import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import RidePosting from "../RidePosting/RidePosting";
import RideSearch from "../RideSearch/RideSearch";

export default () => (
	<Router>
		<Scene key = "root">
			<Scene key = "rideSearch" component = {RideSearch} title = "                                  Ryde"/>
			<Scene key = "login" component = {Login} title = "																						Ryde"/>
			<Scene key = "register" component = {Register} title = "															Ryde"/>
			<Scene key = "choice" component = {Choice} title = "															Ryde"/>
			<Scene key = "ridePosting" component = {RidePosting} title = "                                  Ryde"/>
		</Scene>
	</Router>
);
