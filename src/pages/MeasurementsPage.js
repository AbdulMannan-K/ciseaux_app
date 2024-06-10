import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Pressable,
    Dimensions,
    ScrollView
} from 'react-native';
import {Camera} from 'expo-camera';
import {useDispatch, useSelector} from "react-redux";
import {
    useFonts,
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
} from '@expo-google-fonts/dancing-script';
import BottomDrawer from "react-native-animated-bottom-drawer";
import {ThemeContext} from "../../ThemeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import {updateMeasurements} from "../slices/authSlice";

const MeasurementsPage = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState(null);
    const initialMeasurements = useSelector(state => state.auth.user.measurements);
    const [measurements, setMeasurements] = useState(initialMeasurements);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);
    const bottomDrawer = useRef(null);
    const initialHeight = useSelector(state => state.auth.user.height);
    const [height, setHeight] = useState(initialHeight );
    const [showCam, setCam] = useState(false);
    const [gotImage,setGotImage] = useState(null)
    const theme = useContext(ThemeContext)
    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold,
    });


    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const startRecording = async () => {
        if (cameraRef.current) {
            setIsRecording(true);
            cameraRef.current.recordAsync().then(video => {
                setVideo(video.uri);
            });
        }
    };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setVideo(result.assets[0].uri);
            bottomDrawer.current.close()
            // You might want to send the video to the backend here
        }
    };


    const stopRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording();
            setIsRecording(false);
            // Process the video after recording stops
            // setLoading(true);
            setCam(false)
            // Simulate processing delay
            // setTimeout(() => {
            //     setLoading(false);
            //     setMeasurements({
            //         // armLength: '25 inches',
            //         // chest: '36 inches',
            //         // waist: '30 inches',
            //         // neck: '16 inches',
            //         // shoulders: '18 inches'
            //     });
            // }, 2000);
        }
    };

    const handleChanges = (id, e) => {
        setMeasurements({
            ...measurements,
            [id]: e
        });
    }

    useEffect(() => {
        console.log(loading)
    }, [loading]);

    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData();
        let blob = null;
        try {
            const response = await fetch(video);
            blob = await response.blob();
        }catch (e){
            console.log('blob eror',e)
        }

        const videoUri = video; // The URI you get from the ImagePicker or Camera
        const videoName = videoUri.split('/').pop();
        const match = /\.(\w+)$/.exec(videoName);
        const type = match ? `video/${match[1]}` : `video`;

        formData.append('video',  {
            uri: videoUri,
            name: videoName,
            type: type
        });
        formData.append('height', '5.4');

        try {
            setLoading(true)
            const response = await axios.post('https://ciseaux-body-measure-sctrs.ondigitalocean.app/process_video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response)
            const measurements = response.data.measurements;
            dispatch(updateMeasurements({
                chest: measurements.chest,
                shoulders: measurements.shoulders,
                neck: measurements.neck,
                waist: measurements.waist,
                right_arm: measurements.right_arm,
                right_leg: measurements.right_leg,
                left_arm: measurements.left_arm,
                left_leg: measurements.left_leg,
            }));
            setMeasurements({
                chest: measurements.chest,
                shoulders: measurements.shoulders,
                neck: measurements.neck,
                waist: measurements.waist,
                right_arm: measurements.right_arm,
                right_leg: measurements.right_leg,
                left_arm: measurements.left_arm,
                left_leg: measurements.left_leg,
            })

            const response1= await axios.get(`https://ciseaux-body-measure-sctrs.ondigitalocean.app/get_result_image/${response.data.output_image_path}`,{
                responseType: 'blob'
            })

            const imageURL = URL.createObjectURL(response1.data);
            setGotImage(imageURL)
            // handle response
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    };

    const instructions = [
        '1. Make a 10-15 seconds video of yourself.',
        '2. You should be directly facing the camera',
        '3. Your whole body should be visible in the video',
        '4. The camera should not be far away',
        '5. Your arms should be fully streched.',
        '6. Do not move your body during the recording',
        '7. Your background and surrounding should be clear'
    ]

    return (
        showCam ? <View className='flex-1'>
            <Camera
            ref={cameraRef}
            style={{
                flex: 1,
            }}
            type={Camera.Constants.Type.back}
        >
        </Camera>
            {!isRecording?<Pressable className='absolute bottom-10 right-40' onPress={() => {
                startRecording()
            }}
            >
                <MaterialCommunityIcons name="record-circle-outline" size={50} color={theme.primaryPearl}/>
            </Pressable>:<Pressable
                className='absolute bottom-10 right-40' onPress={() => {
                stopRecording()
            }}
            >
                <MaterialCommunityIcons name="stop-circle-outline" size={50} color={theme.primaryPearl}/>
            </Pressable>}

        </View>: <ScrollView className='bg-primaryPearl pt-28 flex-1' contentContainerStyle={{
            flexGrow: 1,
        }}>
            {
                    loading && <View className='absolute bottom-10 right-44 z-10'>
                        <ActivityIndicator size="large" color={theme.primaryBlack}/>
                    </View>
            }
            <BottomDrawer ref={bottomDrawer} initialHeight={Dimensions.get('window').height - 100} customStyles={{
                container: {
                    backgroundColor: theme.primaryPearl,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }
            }}
                          onClose={() => {
                          }}
            >
                <ScrollView contentContainerStyle={{
                    flexGrow:1,
                    paddingBottom:150,
                }}>
                    <Text className='text-center text-3xl font-bold mt-4' style={{
                        fontFamily: "Roboto_400Regular"
                    }}>Instructions</Text>
                    <View className='flex justify-start items-start px-10'>
                        {
                            instructions.map((instruction, index) => {
                                return (
                                    <View className='flex-row gap-2 mt-2' key={index}>
                                        <Text className='text-primaryBlack text-lg' style={{
                                            fontFamily: "Roboto_400Regular"
                                        }}>{instruction}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className='mx-4 mt-4 rounded-3xl justify-center'>
                        <Pressable className='bg-primaryBlack rounded-3xl p-4 items-center' onPress={() => {
                            setCam(true)
                        }}
                        >
                            <Text className='text-primaryLilac text-2xl' style={{
                                fontFamily: "DancingScript_700Bold"
                            }}>
                                Start Recording
                            </Text>
                        </Pressable>
                        <Pressable className='bg-primaryLilac rounded-3xl mt-2 p-4 items-center' onPress={async () => {
                            pickVideo()
                        }}
                        >
                            <Text className='text-primaryBlack text-2xl' style={{
                                fontFamily: "DancingScript_700Bold"
                            }}>
                                Upload Video
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </BottomDrawer>
            <View className='bg-primaryLilac mx-4 rounded-3xl  '>
                <Text className='text-center text-3xl font-bold mt-4' style={{
                    fontFamily: "DancingScript_700Bold"
                }}>Your Measurements</Text>
                <View className=' flex-row gap-4 justify-center mt-2 mb-4'>
                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Chest</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Chest'
                                   value={measurements.chest.toString()} onChangeText={(e) => {
                            handleChanges('chest', e)
                        }}/>
                    </View>
                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Neck</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Neck'
                                   value={measurements.neck.toString()} onChangeText={(e) => {
                            handleChanges('neck', e)
                        }}/>
                    </View>
                </View>
                <View className=' flex-row gap-4 justify-center mb-4'>
                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Shoulders</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Shoulders'
                                   value={measurements.shoulders.toString()} onChangeText={(e) => {
                            handleChanges('shoulders', e)

                        }}
                        />
                    </View>
                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Arms</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Right Arm'
                                   value={measurements.right_arm.toString()} onChangeText={(e) => {
                            handleChanges('right_arm', e)
                        }}/>
                    </View>
                </View>
                <View className=' flex-row gap-4 justify-center mb-4'>

                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Legs</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Right Leg'
                                   value={measurements.right_leg.toString()} onChangeText={(e) => {
                            handleChanges('right_leg', e)
                        }}/>
                    </View>
                    <View className='w-2/5'>
                        <Text className='text-xs mb-1'>Waist</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Waist'
                                   value={measurements.waist.toString()} onChangeText={(e) => {
                            handleChanges('waist', e)
                        }}/>
                    </View>
                </View>
                <View className=' flex-row gap-4 justify-center mb-4'>
                    <View className='w-1/2'>
                        <Text className='text-xs mb-1'>Height (in feet, eg 5.5)</Text>
                        <TextInput className='bg-primarySilver px-1  h-10 rounded-md' placeholder='Height'
                                   value={height.toString()} onChangeText={(e) => {
                            setHeight(e)
                        }}/>
                    </View>
                </View>
            </View>
            <View className='mx-4 mt-4 rounded-3xl justify-center'>
                <Pressable className='bg-primaryBlack rounded-3xl p-4 items-center' onPress={() => {
                    bottomDrawer.current.open()
                }}>
                    <Text className='text-primaryLilac text-2xl' style={{
                        fontFamily: "DancingScript_700Bold"
                    }}>
                        Check Size
                    </Text>
                </Pressable>
                {
                    video!==null && (
                        <Pressable className='bg-primaryLilac rounded-3xl mt-2 p-4 items-center' onPress={async () => {
                            await handleSubmit()
                        }
                        }
                        >
                            <Text className='text-primaryBlack text-2xl' style={{
                                fontFamily: "DancingScript_700Bold"
                            }}>
                                Send Video
                            </Text>
                        </Pressable>
                    )
                }
                {
                    gotImage!==null && <View className='flex mt-4 rounded-3xl mb-96'>
                        <Image source={{
                            uri: gotImage
                        }} alt='image' className='w-full h-2/3 rounded-3xl'/>
                    </View>
                }
            </View>

            {/*{isRecording ? (*/}
            {/*    <Button title="Stop Recording" onPress={stopRecording} />*/}
            {/*) : (*/}
            {/*    <Button title="Start Recording" onPress={startRecording} />*/}
            {/*)}*/}
            {/*{measurements && (*/}
            {/*    <View style={styles.results}>*/}
            {/*        <Text>Measurements:</Text>*/}
            {/*        <Text>Arm Length: {measurements.armLength}</Text>*/}
            {/*        <Text>Chest: {measurements.chest}</Text>*/}
            {/*        <Text>Waist: {measurements.waist}</Text>*/}
            {/*        <Text>Neck: {measurements.neck}</Text>*/}
            {/*        <Text>Shoulders: {measurements.shoulders}</Text>*/}
            {/*    </View>*/}
            {/*)}*/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '50%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    results: {
        width: '100%',
        padding: 20,
    }
});

export default MeasurementsPage;
