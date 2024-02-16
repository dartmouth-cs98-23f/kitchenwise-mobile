import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useContext } from 'react';
import Slides from './data';  // remove once statistics backend is done
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import UserContext from "../../context/user-context";

const Slider = () => {
  const [index, setIndex] = useState(0);
  // const [slides, setSlides] = useState([]); Uncomment once statistics backend is done
  const scrollX = useRef(new Animated.Value(0)).current;
  const { userId } = useContext(UserContext);

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  // Uncomment once statistics backend is done
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const stats = await getStatistics(userID);
  //       setSlides(Object.values(stats));
  //     } catch (error) {
  //       console.log("Inventory polling failed - server not online");
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item}/>}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index}/>
    </View>
  );
};

export default Slider;
