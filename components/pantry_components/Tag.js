import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const Tag = ({text}) => {
  return(
    <View style={styles.tagContainer}>
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
   
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#52675B",
  }
})

export default Tag;

