import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import {Ionicons} from "@expo/vector-icons";
import OrdersPage from "../pages/OrdersPage";
import VTONPage from "../pages/VTONPage";
import MeasurementsPage from "../pages/MeasurementsPage";
import ProfilePage from "../pages/ProfilePage";
import {useContext} from "react";
import {ThemeContext} from "../../ThemeContext";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

    const theme = useContext(ThemeContext)

    return <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: theme.primaryLilac,
        tabBarInactiveTintColor:theme.primaryPearl,
        tabBarStyle: {
            backgroundColor: theme.primaryBlue,
        },
    }}>
        <Tab.Screen name="Home" component={HomePage} options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
            ),
        }}/>
        <Tab.Screen name="Orders" component={OrdersPage} options={{
            tabBarLabel: 'Orders',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="receipt" color={color} size={size} />
            ),
        }} />
        {/*<Tab.Screen name="VTON" component={VTONPage} options={{*/}
        {/*    tabBarLabel: 'VTON',*/}
        {/*    headerShown: false,*/}
        {/*    tabBarIcon: ({ color, size }) => (*/}
        {/*        <Ionicons name="camera" color={color} size={size} />*/}
        {/*    ),*/}
        {/*}}/>*/}
        <Tab.Screen name="Size" component={MeasurementsPage} options={{
            tabBarLabel: 'Size',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="body" color={color} size={size} />
            ),
        }} />
        <Tab.Screen name="Profile" component={ProfilePage} options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
            ),
        }} />
    </Tab.Navigator>
}

export default BottomNavigator;