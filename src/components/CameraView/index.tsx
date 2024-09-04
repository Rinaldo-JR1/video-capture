import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';

// import { Camera } from 'expo-camera';

import { styles } from './styles';
import { CameraViewProps } from './props'

export function CameraView({ cameraRef, isRecording, onRecord, onStopRecording }: CameraViewProps) {
    const [type, setType] = useState(CameraType.back);

    return (

        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonRecord}
                    onPress={isRecording ? onStopRecording : onRecord}
                >
                    <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start recording'}</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}