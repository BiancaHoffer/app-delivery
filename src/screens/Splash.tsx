import { View, Image, StyleSheet } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { hideAsync } from "expo-splash-screen";
import { useState } from "react";

interface SplashProps {
  onComplete: (status: boolean) => void;
}

export function Splash({ onComplete }: SplashProps) {
  /*const [lastStatus, setLetStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        hideAsync();
      };

      if (status.didJustFinish) {
        onComplete(true)
      };
    };
  };*/

  return (
    <Video
      className="h-full w-full"
      resizeMode={ResizeMode.COVER}
      source={require("../../assets/splash.mp4")}
    //onPlaybackStatusUpdate={onPlaybackStatusUpdate}
    //shouldPlay={true}
    //isLooping={false}
    />
  )
}