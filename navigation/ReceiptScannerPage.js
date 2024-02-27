import { Camera, CameraType } from "expo-camera";
import themeStyles from "../styles";
import { TouchableOpacity, SafeAreaView, Text } from "react-native";
import { useRef, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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
      <Camera type={CameraType.front} ref={cameraRef}>
        <TouchableOpacity onPress={onCapture}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </Camera>
    </SafeAreaView>
  );
};

export default ReceiptScannerPage;
