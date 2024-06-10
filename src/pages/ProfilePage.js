import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Button, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout, updateMeasurements, updateUser} from "../slices/authSlice"; // Adjust import paths as needed
import BottomDrawer from "react-native-animated-bottom-drawer";
import {Feather, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";

const ProfilePage = ({navigation}) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const bottomDrawer = useRef(null);
    const [changePassword, setChangePassword] = useState(false);
    // Form state
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editableUser, setEditableUser] = useState(user);

    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    const handleLogout = () => {
        // dispatch(logout());
        navigation.navigate('Login'); // Adjust as necessary based on your routing setup
    };

    const updateUserInfo = () => {
        console.log("Update User Info:", editableUser);
        dispatch(updateUser(editableUser));
        bottomDrawer.current.close();
    };

    const handleChangePassword = () => {
        if(!newPassword || !confirmPassword) {
            alert("Please fill in both fields");
            return;
        }
        if (newPassword === confirmPassword) {
            console.log("Change Password:", newPassword);
            setEditableUser({...editableUser, password: newPassword})
            dispatch(updateUser(editableUser));
            bottomDrawer.current.close();
        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-primaryPearl p-4">
            <View className="w-24 h-24 mt-10 bg-primaryBlue rounded-full items-center justify-center">
                <Text className="text-primaryPearl text-3xl font-bold">{getInitials(user.name)}</Text>
            </View>
            <Text className="text-xl font-body font-bold text-primaryBlack mt-4 mb-6">
                {user.name}
            </Text>
            <View className="w-full">
                <TouchableOpacity onPress={() => {
                    setChangePassword(false);
                    bottomDrawer.current.open()
                }}
                                  className="p-4 border-b border-primarySilver items-center flex flex-row gap-5">
                    <Feather name="user" size={24} color="black"/>
                    <Text className="text-lg text-primaryBlack">User Information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setChangePassword(true);
                    bottomDrawer.current.open()
                }}
                                  className="p-4 border-b border-primarySilver flex items-center flex-row gap-5">
                    <MaterialCommunityIcons name="form-textbox-password" size={24} color="black"/>
                    <Text className="text-lg text-primaryBlack">Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Size')}
                                  className="p-4 border-b border-primarySilver flex items-center flex-row gap-5">
                    <MaterialCommunityIcons name="tape-measure" size={24} color="black"/>
                    <Text className="text-lg text-primaryBlack">Measurements</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Orders')}
                                  className="p-4 border-b border-primarySilver flex items-center flex-row gap-5">
                    <MaterialIcons name="receipt" size={24} color="black"/>
                    <Text className="text-lg text-primaryBlack">Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}
                                  className="p-4 border-b border-primarySilver flex items-center flex-row gap-5">
                    <MaterialIcons name="logout" size={24} color="black"/>
                    <Text className="text-lg text-primaryBlack">Logout</Text>
                </TouchableOpacity>
            </View>
            <BottomDrawer ref={bottomDrawer} initialHeight={500}>
                <View className="p-4">
                    {!changePassword ? <View>
                            <Text className="text-lg font-bold mb-4">Edit User Info:</Text>
                            <View className='mb-4'>
                                <Text className="text-xs font-bold ">Name:</Text>
                                <TextInput
                                    value={editableUser.name}
                                    onChangeText={(text) => setEditableUser({...editableUser, name: text})}
                                    className="border border-primarySilver p-2 rounded-lg "
                                    placeholder="Name"
                                />
                            </View>
                            <View className='mb-4'>
                                <Text className="text-xs font-bold">Email:</Text>
                                <TextInput
                                    value={editableUser.email}
                                    onChangeText={(text) => setEditableUser({...editableUser, email: text})}
                                    className="border border-primarySilver p-2 rounded-lg "
                                    placeholder="Email"
                                />
                            </View>

                            <View className='mb-4'>
                                <Text className="text-xs font-bold">Phone:</Text>
                                <TextInput
                                    value={editableUser.phone}
                                    onChangeText={(text) => setEditableUser({...editableUser, phone: text})}
                                    className="border border-primarySilver p-2 rounded-lg "
                                    placeholder="Phone"
                                />
                            </View>
                            <View className='mb-4'>
                                <Text className="text-xs font-bold">Address:</Text>
                                <TextInput
                                    value={editableUser.address}
                                    onChangeText={(text) => setEditableUser({...editableUser, address: text})}
                                    className="border border-primarySilver p-2 rounded-lg "
                                    placeholder="Address"
                                />
                            </View>
                            <View className='mb-4'>
                                <Text className="text-xs font-bold">Height:</Text>
                                <TextInput
                                    value={editableUser.height.toString()}
                                    onChangeText={(text) => setEditableUser({...editableUser, height: text})}
                                    className="border border-primarySilver p-2 rounded-lg "
                                    placeholder="Height"
                                />
                            </View>
                            {/*<Button title="Update Info" onPress={updateUserInfo}/>*/}
                            <View className='flex justify-center items-center'>
                                <Pressable className='bg-primaryBlue p-2 justify-center items-center rounded-3xl my-2'
                                           onPress={updateUserInfo}>
                                    <Text className='text-primaryPearl text-2xl px-4'>Update Info</Text>
                                </Pressable>
                            </View>
                        </View> :
                        <View className="border-t border-primarySilver mt-4 mb-4">
                            <Text className="text-lg font-bold mb-4 mt-4">Change Password:</Text>
                            <TextInput
                                value={newPassword}
                                onChangeText={setNewPassword}
                                className="border border-primarySilver p-2 rounded-lg mb-2"
                                placeholder="New Password"
                                secureTextEntry
                            />
                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                className="border border-primarySilver p-2 rounded-lg mb-4"
                                placeholder="Confirm Password"
                                secureTextEntry
                            />
                            <View className='flex justify-center items-center'>
                                <Pressable className='bg-primaryBlue p-2 justify-center items-center rounded-3xl my-2'
                                           onPress={handleChangePassword}>
                                    <Text className='text-primaryPearl text-xl px-4'>Change Password</Text>
                                </Pressable>
                            </View>
                        </View>}
                </View>
            </BottomDrawer>
        </SafeAreaView>
    );
};

export default ProfilePage;
