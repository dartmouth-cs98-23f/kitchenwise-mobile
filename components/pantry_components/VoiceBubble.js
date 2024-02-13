import { StyleSheet } from "react-native";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Bubble from "../Bubble.js";

const VoiceBubble = () => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate("Narration");
  }, []);

  return (
    <Bubble
      color="#4D8AFF"
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
