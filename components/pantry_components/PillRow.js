import { View, StyleSheet, Text, ScrollView } from "react-native";
import themeStyles from "../../styles";
import { useMemo } from "react";

const Pill = ({ title, color, width }) => {
  return (
    <View
      style={[
        styles.pillContainer,
        { width: width || "auto" },
        { backgroundColor: color || themeStyles.colors.interactableBackground },
      ]}
    >
      <Text style={[styles.pillText, { color: color ? "white" : "black" }]}>
        {title}
      </Text>
    </View>
  );
};
const PillRow = ({
  items,
  selectedItems,
  onItemSelect,
  onItemDeselect,
  selectedColor,
  width,
}) => {
  const unselectedItems = useMemo(
    () => items.filter((item) => !selectedItems.includes(item)),
    [selectedItems, items]
  );
  return (
    <ScrollView
      contentContainerStyle={styles.rowContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {selectedItems.map((item, i) => (
        <Pill title={item} key={i} color={selectedColor} width={width} />
      ))}
      {unselectedItems.map((item, i) => (
        <Pill title={item} key={i} width={width} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 32,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  pillContainer: {
    height: "100%",
    borderRadius: "4%",
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pillText: {
    fontFamily: "Lato",
    fontSize: 14,
  },
});

export default PillRow;
