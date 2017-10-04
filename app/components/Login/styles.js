import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "white",
	},
	inputBox: {
		height: 40, 
		width: 100, 
		borderColor: 'black', 
		borderWidth: 1
	},
	submitButton: {
		position: "relative", 
		bottom: -20, 
		left: 50, 
		width: 100, 
		height: 25
	},
	registerContainer: {
		position: "relative",
		bottom: 120,
	}
});

module.exports = styles;