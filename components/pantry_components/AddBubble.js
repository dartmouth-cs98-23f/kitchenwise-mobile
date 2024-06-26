import { Ionicons } from "@expo/vector-icons";

import Bubble from "../Bubble.js";
import { StyleSheet } from "react-native";

const AddBubble = ({ onPress }) => {
  return (
    <Bubble positionStyle={styles.bubblePosition} onPress={onPress}>
      <Ionicons name="add" size={32} color="#000" />
    </Bubble>
  );
};

const styles = StyleSheet.create({
  bubblePosition: { bottom: 72 + 32, left: 12 },
});

export default AddBubble;
