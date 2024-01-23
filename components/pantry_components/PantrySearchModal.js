import {Modal, SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Input from '../form_components/Input';
import Tag from './Tag';

const PantrySearchModal = (props)=> {
  return(
    <Modal 
    visible={props.visible}
    transparent={true}
    animationType="fade"
  >
    <SafeAreaView style={styles.filterModalContainer}>
      <View style={styles.searchPanel}>
          <Input 
            placeholder="Search your Items.. "
            style={styles.searchBar}
          />
        <View style={styles.filtersBlock}>
            <Tag text={"tag"} />
            <Tag text={"tag"} />
            <Tag text={"tag"} />
            <Tag text={"tag"} />
            <Tag text={"tag"} />
        </View>
        <View>
          <TouchableOpacity style = {styles.doneButton} onPress={props.filterDoneHandler}><Text>Done</Text></TouchableOpacity>
        </View>
     
      </View>
    </SafeAreaView>
  </Modal>
  );
}

const styles = StyleSheet.create({
  searchPanel: {
    backgroundColor: "#957E51",
    padding: "5%",
    width: "100%",
    height: "95%",
    borderRadius: 10,
    alignItems: "center"
    
  },
  filtersBlock: {
   width: "100%",
   flexDirection: "row",
   justifyContent: 'space-evenly',
   alignItems: 'flex-start',
   marginTop: 5,
   marginBottom: 10,

  },
  filters: {
    margin: 15,
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  filterSelect: {
    margin: 15,
  },
  searchBar:{
    borderWidth: 2,
    color: "black",
    backgroundColor: "white"
  },
  doneButton: {
    backgroundColor: 'grey',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  }
})

export default PantrySearchModal;
