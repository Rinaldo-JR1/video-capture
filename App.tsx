import { useEffect, useState, useRef } from "react"
import { StyleSheet, Text, View } from 'react-native';

import { Camera, CameraRecordingOptions } from "expo-camera/legacy"
import { Video } from 'expo-av';
import { shareAsync, SharingOptions } from "expo-sharing"
import * as MediaLibary from "expo-media-library"

import { VideoPlayer } from "./src/components/VideoPlayer";
import { CameraView } from "./src/components/CameraView";



export default function App() {
  const cameraRef = useRef<Camera>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
  const [video, setVideo] = useState<{ uri: string }>()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean>(false)
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)



  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted')

      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      setHasMicrophonePermission(microphonePermission.status === 'granted')

      const mediaLibaryPermission = await MediaLibary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibaryPermission.status === 'granted')

    })()
  }, [])

  if (!hasCameraPermission) {
    return (<View><Text>Sem permissao da camera</Text></View>)
  }
  if (!hasMicrophonePermission) {
    return (<View><Text>Sem permissao ao microfone</Text></View>)
  }
  if (!hasMediaLibraryPermission) {
    return (<View><Text>Sem permissao aos albuns</Text></View>)
  }

  const recordVideo = async () => {
    setIsRecording(true)
    const options: CameraRecordingOptions = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    }

    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo)
        setIsRecording(false)
      })
    }
  }

  const stopRecording = async () => {
    if (cameraRef && cameraRef.current) {
      setIsRecording(false)
      cameraRef.current.stopRecording()
    }
  }



  if (video) {
    const shareVideo = async () => {
      await shareAsync(video.uri)
    }
    const saveVideo = async () => {
      await MediaLibary.saveToLibraryAsync(video.uri)
      setVideo(undefined)
    }
    const discardVideo = async () => {
      setVideo(undefined)
    }
    return (
      <VideoPlayer
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDiscard={discardVideo}
      />
    )
  }

  return (
    <CameraView
      cameraRef={cameraRef}
      isRecording={isRecording}
      onRecord={recordVideo} // recordVideo
      onStopRecording={stopRecording} // stopRecording
    />
  );
}
