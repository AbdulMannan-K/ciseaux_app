import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useContext} from "react";
import {Image, View, Text, TouchableOpacity} from "react-native"
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BottomNavigator from "./BottomNavigator";
import {ThemeContext} from "../../ThemeContext";
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CartPage from "../pages/CartPage";

export function NavigationStack({navigation}) {

    const Stack = createNativeStackNavigator();
    const theme = useContext(ThemeContext)

    const headerOptions = {
        headerBackTitleVisible: false,
        headerTitle: '',
        headerTransparent: true,
        headerLeft: () => (
            <TouchableOpacity onPress={() => {
                navigation.openDrawer()
            }}>
                <View style={{marginLeft: 20}}>
                    <FontAwesome6 name="bars-staggered" size={24} color="black" />
                </View>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Cart')
            }}>
                <View style={{marginRight: 20}}>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                </View>
            </TouchableOpacity>
        ),
    }

    return (
        <Stack.Navigator initialRouteName='Bottom' screenOptions={{gestureEnabled: false}}>
            <Stack.Screen options={headerOptions} name={"Bottom"} component={BottomNavigator} />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerBackTitleVisible: false,
                    headerTintColor:'white',
                    headerTitle: '',
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerBackTitleVisible: false,
                    headerTintColor:'white',
                    headerTitle: '',
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Cart"
                component={CartPage}
                options={{
                    // headerBackTitleVisible: false,
                    // headerTintColor:'white',
                    // headerTitle: '',
                    // headerTransparent: true
                }}
                />
        </Stack.Navigator>
    )
}