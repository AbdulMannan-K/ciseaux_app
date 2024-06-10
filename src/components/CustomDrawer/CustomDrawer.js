import {View, Text, Switch, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext, useState} from "react";
import {ThemeContext} from "../../../ThemeContext";
export function CustomDrawer(){

    const theme = useContext(ThemeContext);

    return (
        <SafeAreaView >
           <Text>
               Ciseux
           </Text>
        </SafeAreaView>
    )
}