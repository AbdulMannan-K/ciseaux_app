import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from "./ThemeContext";
import {DrawerNavigator} from "./src/components/DrawerNavigator";
import {Provider} from "react-redux";
import {store} from "./src/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


function App() {
    const theme = useContext(ThemeContext);

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <DrawerNavigator/>
                </NavigationContainer>
                <Toast
                    position={'bottom'}
                />
            </Provider>
        </SafeAreaProvider>
    );
}

export default App;
