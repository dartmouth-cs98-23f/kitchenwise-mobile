import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import themeStyles from "../../styles";
import { useMemo } from "react";

const Pill = ({ title, color, width, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.pillContainer,
        { width: width + (title.length*2) || "auto" },
        { backgroundColor: color || themeStyles.colors.interactableBackground },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, { color: color ? "white" : "black" }]}>
        {title}
      </Text>
    </TouchableOpacity>
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
  return (
    <ScrollView
      contentContainerStyle={styles.rowContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {Array.from(selectedItems).map((item, i) => (
        <Pill
          title={item}
          key={i}
          color={selectedColor}
          width={width}
          onPress={() => {
            onItemDeselect(item);
          }}
        />
      ))}
      {items
        .filter((item) => !selectedItems.includes(item))
        .map((item, i) => (
          <Pill
            title={item}
            key={i}
            width={width}
            onPress={() => {
              onItemSelect(item);
            }}
          />
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
    paddingHorizontal: 4,
  },
  pillText: {
    fontFamily: "Lato",
    fontSize: 14,
  },
});

export default PillRow;
