import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Choice from "../Choice/Choice";
import DriverInfo from "../DriverInfo/DriverInfo";
import Chat from "../Chat/Chat";

export default () => (
	<Router>
		<Scene key = "root">
			<Scene key = "chat" component = {Chat} title = "																						Ryde"/>
			<Scene key = "login" component = {Login} title = "																						Ryde"/>
			<Scene key = "register" component = {Register} title = "															Ryde"/>
			<Scene key = "choice" component = {Choice} title = "															Ryde"/>	
			<Scene key = "driverInfo" component = {DriverInfo} title = "															Ryde"/>
		</Scene>
	</Router>
);
