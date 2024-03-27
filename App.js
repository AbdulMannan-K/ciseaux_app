import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your page components
import HomePage from './src/pages/HomePage';
import VTONPage from './src/pages/VTONPage';
import MeasurementsPage from './src/pages/MeasurementsPage'; // Renamed from MeasurementsPage
import OrdersPage from './src/pages/OrdersPage';
import ProfilePage from './src/pages/ProfilePage';

const Tab = createBottomTabNavigator();


function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomePage} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}/>
                <Tab.Screen name="Orders" component={OrdersPage} options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="receipt" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="VTON" component={VTONPage} options={{
                    tabBarLabel: 'VTON',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" color={color} size={size} />
                    ),
                }}/>
                <Tab.Screen name="Size" component={MeasurementsPage} options={{
                    tabBarLabel: 'Size',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="body" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="Profile" component={ProfilePage} options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
