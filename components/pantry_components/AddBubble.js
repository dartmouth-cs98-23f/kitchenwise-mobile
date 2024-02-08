import { Ionicons } from "@expo/vector-icons";

import Bubble from "../Bubble.js";
import { StyleSheet } from "react-native";
import { useCallback } from "react";

const AddBubble = ({}) => {
  return (
    <Bubble positionStyle={styles.bubblePosition}>
      <Ionicons name="add" size={32} color="#000" />
    </Bubble>
  );
};

const styles = StyleSheet.create({
  bubblePosition: { width: 48, height: 48, bottom: 72 + 32, left: 12 },
});

export default AddBubble;
