import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useContext, useEffect } from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import UserContext from "../../context/user-context";
import { getStatistics } from "../../api/statistics-api";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getStatistics(userId);
        setSlides(Object.values(stats));
      } catch (error) {
        console.log("Failed to get statistics");
        throw error;
      }
    };
    fetchData();
  }, []);

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={slides}
        renderItem={({item}) => <SlideItem item={item}/>}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={slides} scrollX={scrollX} index={index}/>
    </View>
  );
};

export default Slider;
