import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

const SlideItem = ({ item}) => {
  // Function to replace placeholders with actual values
  const replacePlaceholders = (template, data) => {
    return template.replace(/{{(.*?)}}/g, (match, group) => {
      return data[group] !== undefined ? data[group] : match;
    });
  };

  // Replace placeholders in description
  const description = replacePlaceholders(item.description, item);

  // Replace placeholders in foodGroupBreakdown
  let foodGroupBreakdown = [];
  if (item.foodGroupBreakdown) {
    foodGroupBreakdown = item.foodGroupBreakdown.map((group) => ({
      ...group,
      quantity: replacePlaceholders(group.quantity, item),
    }));
  }

  // Replace placeholders in caloricBreakdown
  let caloricBreakdown = [];
  if (item.caloricBreakdown) {
    caloricBreakdown = item.caloricBreakdown.map((group) => ({
      ...group,
      quantity: replacePlaceholders(group.quantity, item),
    }));
  }

  // Determine background color based on index
  const cardColors = ['#336699', '#993366', '#669933', '#996633', '#339966'];
  const backgroundColor = cardColors[item.statisticId % cardColors.length];

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.description}>{description}</Text>
      {foodGroupBreakdown.length > 0 && (
        <View>
          <Text style={styles.subHeading}>Breakdown by Food Group:{'\n'}</Text>
          <Text style={styles.list}>
            {foodGroupBreakdown.map((group, index) => (
              <Text key={index}>
                • {group.category}: {group.unit === '$' ? `${group.unit}${group.quantity}` : `${group.quantity}${group.unit === '%' ? group.unit : ` ${group.unit}`}`}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>
      )}
      {caloricBreakdown.length > 0 && (
        <View>
          <Text style={styles.subHeading}>Caloric Breakdown:{'\n'}</Text>
          <Text style={styles.list}>
            {caloricBreakdown.map((group, index) => (
              <Text key={index}>
                • {group.category}: {group.unit === '$' ? `${group.unit}${group.quantity}` : `${group.quantity}${group.unit === '%' ? group.unit : ` ${group.unit}`}`}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>
      )}
      <Text style={styles.month}>{item.peakMonth}</Text>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: width,
    height: height,
    alignItems: 'center',
  },
  description: {
    fontSize: 24,
    marginVertical: height / 6,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  list: {
    fontSize: 18,
    color: '#fff', // White text color
    textAlign: 'left',
  },
  month: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // White text color
    marginTop: 20,
    textAlign: 'center',
  },
});
