import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

// TODO: this needs to be more intuitive and well thought out
const Select = (props) => {
  return <Picker itemStyle={styles.pickerItem} {...props} />;
};

const styles = StyleSheet.create({
  picker: {},
  pickerItem: { height: 64 },
});

export default Select;
