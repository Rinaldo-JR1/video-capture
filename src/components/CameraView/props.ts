import { Camera } from "expo-camera/legacy";
import React from "react";

export interface CameraViewProps {
  cameraRef: React.RefObject<Camera>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}
