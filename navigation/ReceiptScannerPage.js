import { Camera, CameraType } from "expo-camera";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useRef, useCallback, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { Circle } from "react-native-animated-spinkit";

import themeStyles from "../styles";
import UserContext from "../context/user-context";
import { sendReceipt } from "../api/fooditem-api";

const ReceiptScannerPage = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  useEffect(() => {
    if (!permission) {
      requestPermission();
    } else if (!permission.granted) {
      navigation.goBack();
    }
  }, [permission, requestPermission, navigation]);
  const cameraRef = useRef(null);
  const onCapture = useCallback(async () => {
    if (cameraRef?.current) {
      const imgObject = await cameraRef.current.takePictureAsync({
        imageType: "jpeg",
      });
      try {
        setLoading(true);
        setImgUri(imgObject.uri);
        cameraRef.current.pausePreview();
        const scanResult = await sendReceipt(userId, imgObject.uri);
        showMessage({
          message: "Successful scan",
          description: "Your receipt was successfully scanned.",
          type: "success",
        });
        navigation.goBack();
      } catch (err) {
        showMessage({
          message: "Error",
          description: err?.response?.data?.message || "Server Error",
          type: "danger",
        });
      }
      setLoading(false);
    }
  }, [cameraRef]);
  return (
    <SafeAreaView style={themeStyles.components.screenContainer}>
      <Camera
        type={CameraType.back}
        ref={cameraRef}
        style={styles.cameraComponent}
        autoFocus
      >
        <View style={styles.overlayContainer}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" color="white" size={32} />
            </TouchableOpacity>
          </View>
          {!loading ? (
            <View style={styles.cameraButton}>
              <TouchableOpacity
                onPress={onCapture}
                style={styles.cameraButtonInner}
              />
            </View>
          ) : (
            <Circle color="white" />
          )}
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
