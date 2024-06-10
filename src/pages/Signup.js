import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {useDispatch} from "react-redux";
import login from "./Login";

const Signup = ({navigation}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        height: ''
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSignup = () => {
        const { name, email, password, confirmPassword, phone, address, height } = formData;

        // Basic validation
        if (!name || !email || !password || !confirmPassword || !phone || !address || !height) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log('FormData:', formData);

        setError('');

        dispatch(login({
            name,
            email,
            password,
            phone,
            address,
            height,
            orders: [],
        }))

        navigation.navigate('Profile');
        // Proceed with API call or state update here
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Signup</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('name', text)}
                value={formData.name}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('email', text)}
                value={formData.email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('password', text)}
                value={formData.password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('phone', text)}
                value={formData.phone}
                placeholder="Phone"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('address', text)}
                value={formData.address}
                placeholder="Address"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange('height', text)}
                value={formData.height}
                placeholder="Height"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F2EDE4', // primaryPearl
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343434', // primaryBlack
    },
    input: {
        width: '100%',
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
        width: '100%',
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

export default Signup;
