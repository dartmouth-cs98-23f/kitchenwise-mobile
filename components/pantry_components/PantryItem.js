import { View, Text, StyleSheet, Image } from 'react-native';


const PantryItem = ({ name, expiration, image, quantity, unit }) => (
  <View style={styles.pantryItemContainer}>
    <View>
      <Text style={styles.itemName}>{name}</Text>
      <Text>
        {quantity} {unit}
      </Text>
    </View>
    {expiration && (
      <View style={styles.expirationIndicator}>
        <Text style={[styles.expirationText, { fontSize: 9 }]}>exp.</Text>
        <Text style={styles.expirationText}>{expiration}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  pantryItemContainer: {
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});


export default PantryItem;