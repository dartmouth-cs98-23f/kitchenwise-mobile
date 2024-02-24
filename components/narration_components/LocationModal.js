import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomModal from "../modals/BottomModal";

const LocationModal = ({
  locationNames,
  currentLocation,
  onLocationChange,
  onConfirm,
}) => {
  return (
    <BottomModal
      title="Choose Food Location"
      visible={currentLocation != null}
      onConfirm={onConfirm}
      oneButton
    >
      <View style={styles.formContainer}>
        <Picker value={currentLocation} onValueChange={onLocationChange}>
          {locationNames.map((name, i) => (
            <Picker.Item label={name} value={name} key={i} />
          ))}
        </Picker>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 8,
  },
});

export default LocationModal;
