import { Camera, CameraType } from "expo-camera";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useRef, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import themeStyles from "../styles";

const ReceiptScannerPage = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();
  useEffect(() => {
    if (!permission) {
      requestPermission();
    } else if (!permission.granted) {
      navigation.goBack();
    }
  }, [permission, requestPermission, navigation]);
  const cameraRef = useRef(null);
  const onCapture = useCallback(() => {
    console.log(cameraRef?.current);
  }, [cameraRef]);
  return (
    <SafeAreaView style={themeStyles.components.screenContainer}>
      <Camera
        type={CameraType.front}
        ref={cameraRef}
        style={styles.cameraComponent}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" color="white" size={32} />
            </TouchableOpacity>
          </View>
          <View style={styles.cameraButton}>
            <TouchableOpacity
              onPress={onCapture}
              style={styles.cameraButtonInner}
            />
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraComponent: {
    height: "100%",
    width: "100%",
  },
  topRow: {
    width: "100%",
    paddingHorizontal: 12,
  },

  overlayContainer: {
    height: "100%",
    width: "100%",
    elevation: 3,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 32,
  },
  cameraButton: {
    backgroundColor: "white",
    height: 64,
    width: 64,
    borderRadius: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButtonInner: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 2,
  },
});

export default ReceiptScannerPage;
