import {StyleSheet, Dimensions} from "react-native";
var {height,width} = Dimensions.get("window");

const styles = StyleSheet.create({
	firstDivision: {
		flex: 1
	},

  profile: {
		flex: 1,
    backgroundColor: 'rgb(0, 51, 153)',
    alignItems:'center'
	},

  userPlaceholderImage: {
		height:'45%',
    width: '30%',
    borderRadius: 100,
    marginTop: '10%'
	},

  userName: {
		color:'#fff',
		fontSize:20,
		marginTop:'6%',
		fontFamily: 'sans-serif'
	},

  rating: {
		flexDirection:'row',
	flexWrap:'wrap'
	},

  star: {
    height:'63%',
		width: '5.5%',
		marginTop:'1.9%'
  },

  ratingNum: {
    color:'#fff',
		marginTop:'1.9%',
		fontSize:14,
		marginLeft:'0.5%',
		fontFamily: 'sans-serif'
  },

  drawerOptions: {
    flex: 2,
		backgroundColor: '#fff',
		paddingTop:'19%'
  },

  drawerIcons: {
    color: 'rgb(0, 51, 153)'
  },

  drawerOptionsMargin: {
    marginTop:'6%'
  },

  drawerItems: {
    color:'black',
		fontSize:18,
		fontFamily: 'sans-serif' // Corbert
  },

});

module.exports = styles;
