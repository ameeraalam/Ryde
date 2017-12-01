import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "white",
	},
	content: {
		alignItems: 'center'
	},
	logo: {
		color: 'rgb(0, 51, 153)',
		fontFamily: 'Roboto',
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: '3%'
	},
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center'
	},

	inputBox: {
		height: 40,
		width: 280,
		borderBottomColor: 'rgb(0, 51, 153)',
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderWidth: 1,
		borderRadius: 20,
		marginBottom:'25%',
		textAlign:'center',
		fontFamily: 'sans-serif'

	},
	registerContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		marginTop:'5%',
		alignItems: 'center'
	},
	submitButtonOnLogin: {
		backgroundColor:'rgb(0, 51, 153)',
		textAlign:'center',
		height:54,
		color:'#fff',
		fontSize:18,
<<<<<<< HEAD
		paddingTop:'5%',
		fontFamily: 'sans-serif',
		marginTop: '10%'
=======
		paddingTop:14,
		fontFamily: 'sans-serif'
>>>>>>> f99511f1586e1c495ce092453d5be35e4b63024a
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
