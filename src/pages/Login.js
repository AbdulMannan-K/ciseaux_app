import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {useDispatch} from "react-redux";
import {login} from "../slices/authSlice";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }
        // Add more validation or API integration here
        console.log('Email:', email, 'Password:', password);
        // Clear the error if everything is fine
        setError('');
        dispatch(login({
            email,
            password,
            name: 'Abdul Mannan',
            phone: '1234567890',
            address: '123',
            orders: [],
            measurements: {
                chest: 20,
                shoulders: 32,
                neck: 10,
                waist: 20,
                right_arm: 30,
                right_leg: 30,
                left_arm: 30,
                left_leg: 30,
            },
            height: 6,
        }));

        navigation.navigate('Profile');
        // Here you would typically navigate to another screen or update some global state
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {/*Signup Link*/}
            <TouchableOpacity className="self-start mx-10" onPress={() => navigation.navigate('Signup')}>
                <Text>Don't have an account? Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EDE4', // primaryPearl
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343434', // primaryBlack
    },
    input: {
        width: '80%',
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#C8A2C8', // primaryLilac
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
    },
    button: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A7FDB', // primaryBlue
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
