import { Text } from "react-native";
import themeStyles from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

const NarrationPage = () => {
  return (
    <SafeAreaView style={[themeStyles.components.screenContainer]}>
      <Text style={themeStyles.text.h2}>What do you want to add?</Text>
    </SafeAreaView>
  );
};

export default NarrationPage;
