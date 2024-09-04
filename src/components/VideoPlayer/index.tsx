import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

import { Audio, Video } from 'expo-av';

import { styles } from './styles';
import { VideoPlayerProps } from './props'

export function VideoPlayer({ onDiscard, onSave, onShare, video }: VideoPlayerProps) {
    return (
        <SafeAreaView style={styles.container}>
            <Video style={styles.video} source={{ uri: video.uri }} useNativeControls isLooping />
            <View style={styles.menuButtons}>
                <Button title="Share" onPress={onShare} />
                <Button title="Save" onPress={onSave} />
                <Button title="Discard" onPress={onDiscard} />
            </View>
        </SafeAreaView>
    );
}