import {CustomDrawer} from "./CustomDrawer/CustomDrawer";
import {NavigationStack} from "./NavigationStack";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";


export function DrawerNavigator() {

    const Drawer = createDrawerNavigator();

    return <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} initialRouteName="Stack">
        <Drawer.Screen name="Stack" component={NavigationStack} options={{
            headerShown: false
        }}/>
    </Drawer.Navigator>
}