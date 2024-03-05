import { StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

import Bubble from "../Bubble.js";
import themeStyles from "../../styles.js";

const VoiceBubble = () => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    Audio.requestPermissionsAsync().then((permission) => {
      if (permission.status === "granted") {
        navigation.navigate("Narration");
      }
    });
  }, []);

  return (
    <Bubble
      color={themeStyles.colors.logoBlue}
      positionStyle={styles.bubblePosition}
      onPress={onPress}
    >
      <Ionicons name="mic-outline" size={32} color="#FFF" />
    </Bubble>
  );
};

const styles = StyleSheet.create({
  bubblePosition: { bottom: 72 + 32, right: 12 },
});

export default VoiceBubble;
