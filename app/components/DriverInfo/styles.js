import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	submitButton: {
		position: "relative",
		left: 105,
		width: 200,
		height: 50
	},
	loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .2)"
	}
});

module.exports = styles;
