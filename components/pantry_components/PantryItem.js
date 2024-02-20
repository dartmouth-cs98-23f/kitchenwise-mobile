import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import themeStyles from "../../styles";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const MAX_DRAG = 56;
const springConfig = {
  duration: 200,
  overshootClamping: true,
  dampingRatio: 1.7,
};

const PantryItem = ({ foodItem, onDelete, onEdit }) => {
  const { name, expiration, quantity, unit } = foodItem;
  const amountPanned = useSharedValue(0);
  const swiped = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (!swiped.value) {
        if (Math.abs(e.translationX) >= MAX_DRAG - 16) {
          amountPanned.value = withSpring(
            Math.sign(e.translationX) * MAX_DRAG,
            springConfig
          );
          swiped.value = true;
        } else amountPanned.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (!swiped.value) {
        amountPanned.value = withSpring(0, springConfig);
      }
    });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: 1 * amountPanned.value }],
    };
  });
  const onInfoPress = useCallback(() => {
    swiped.value = false;
    amountPanned.value = withSpring(0, springConfig);
  }, []);
  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.pantryItemContainer}>
        <Animated.View
          style={[styles.infoLayer, animatedStyles]}
          onPress={onInfoPress}
        >
          <TouchableOpacity
            width="100%"
            height="100%"
            activeOpacity={1}
            style={styles.innerInfoLayer}
            onPress={onInfoPress}
          >
            <Text style={styles.itemName}>{toTitleCase(name)}</Text>
            {expiration ? (
              <Text style={[styles.itemInfoText]}>
                {expiration ? "exp." + expiration : null}
              </Text>
            ) : null}
            <Text style={[styles.itemInfoText]}>
              {quantity} {unit}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.backLayer}>
          <TouchableOpacity
            style={[
              styles.modifyButton,
              {
                backgroundColor: themeStyles.colors.success,
              },
            ]}
            onPress={onEdit}
          >
            <Ionicons size={28} name="create-outline" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modifyButton,
              {
                backgroundColor: themeStyles.colors.failure,
              },
            ]}
            onPress={() => onDelete(foodItem)}
          >
            <Ionicons size={32} name="trash-outline" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  pantryItemContainer: {
    borderRadius: 10,
    marginVertical: 4,
    elevation: 4,

    // overflow: Platform.OS === "android" ? "hidden" : "visible",
    width: "100%",
    height: 56,
    overflow: "hidden",
  },
  backLayer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modifyButton: {
    width: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoLayer: {
    elevation: 3,
    zIndex: 3,
    position: "absolute",
    height: "100%",
    width: "100%",

    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
  },
  innerInfoLayer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  itemName: {
    fontSize: 16,
    color: "#333",
    flexGrow: 1,
    paddingRight: 16,
    maxWidth: "80%",
  },
  itemInfoText: {
    color: "#333",
    width: "20%",
    textAlign: "right",
  },
  itemInfoContainer: {
    flex: 3,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  editScreen: {
    height: "100%",
  },
  editImg: {
    backgroundColor: "blue",
    height: "40%",
    width: "100%",
    marginVertical: "10%",
  },
  editIteamHeader: {
    fontSize: "40%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  editItemSubheader: {
    fontSize: "25%",
    marginTop: "10%",
  },
  editInfoContainer: {
    marginLeft: "5%",
  },
  editDone: {
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal: "40%",
    marginVertical: "10%",
    padding: "2%",
    borderRadius: "5%",
  },
  doneText: {
    color: "white",
  },
});

export default PantryItem;
