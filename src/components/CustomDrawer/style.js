import {StyleSheet} from "react-native";

export const styleSheet = (theme)=> StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:theme.backgroundSecondary,
        alignItems:'center',
        justifyContent:'flex-start',
        gap:50,
        paddingTop:50,
    },
    socialBox:{
        flexDirection:'column',
        padding:10,
        gap:10,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.backgroundSecondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    superBox:{
        flexDirection:'row',
        justifyContent:'center',
        gap:20,
        padding:10,
    },
})