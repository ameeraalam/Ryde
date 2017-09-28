import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Login from "../Login/Login";

export default () => (
	<Router>
		<Scene key = "root">
			<Scene key = "login" component = {Login} title = "																						Ryde"/>
		</Scene>
	</Router>
);
