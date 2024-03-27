import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

const MeasurementsPage = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState(null);
    const [measurements, setMeasurements] = useState(null);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const startRecording = async () => {
        if (cameraRef.current) {
            setIsRecording(true);
            cameraRef.current.recordAsync().then(video => {
                setVideo(video.uri);
                // You might want to send the video to the backend here or in the stopRecording function
            });
        }
    };

    const stopRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording();
            setIsRecording(false);
            // Process the video after recording stops
            setLoading(true);
            // Simulate processing delay
            setTimeout(() => {
                setLoading(false);
                setMeasurements({
                    armLength: '25 inches',
                    chest: '36 inches',
                    waist: '30 inches',
                    neck: '16 inches',
                    shoulders: '18 inches'
                });
            }, 2000);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={cameraRef}>
                {isRecording && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Recording...</Text>
                    </View>
                )}
            </Camera>
            {isRecording ? (
                <Button title="Stop Recording" onPress={stopRecording} />
            ) : (
                <Button title="Start Recording" onPress={startRecording} />
            )}
            {measurements && (
                <View style={styles.results}>
                    <Text>Measurements:</Text>
                    <Text>Arm Length: {measurements.armLength}</Text>
                    <Text>Chest: {measurements.chest}</Text>
                    <Text>Waist: {measurements.waist}</Text>
                    <Text>Neck: {measurements.neck}</Text>
                    <Text>Shoulders: {measurements.shoulders}</Text>
                </View>
            )}
        </View>
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
