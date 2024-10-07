import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import categories from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

// Reusable component for header
const itemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons
            name="arrow-down-outline"
            size={20}
            color={Colors.grey_lime}
          />
          <Text style={{ flex: 1, color: "black" }}>Sort</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey_lime} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons
            name="fast-food-outline"
            size={20}
            color={Colors.grey_lime}
          />
          <Text style={{ flex: 1, color: "black" }}>Rating</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey_lime} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons
            name="pricetag-outline"
            size={20}
            color={Colors.grey_lime}
          />
          <Text style={{ flex: 1, color: "black" }}>Offers</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey_lime} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemLast}>
          <Ionicons
            name="nutrition-outline"
            size={20}
            color={Colors.grey_lime}
          />
          <Text style={{ flex: 1, color: "black" }}>Only Veg</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey_lime} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Categories</Text>
    </>
  );
};

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  // UseEffect to monitor the selected checked items
  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;
    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0, { duration: 250 }); // 300ms animation duration for newSelected ? 150 : 0;
      scale.value = withTiming(newSelected ? 1 : 0, { duration: 250 });
    }

    setSelected(selectedItems);
  }, [items]);

  // Function to handle checkbox press and update state immutably
  const handleCheckboxPress = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  // Clear all selections
  const handleClearAll = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: false,
    }));
    setItems(updatedItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Render each item
  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemCount}>({item.count})</Text>
      </View>
      <BouncyCheckbox
        fillColor={Colors.grey_lime}
        unFillColor="#fff"
        iconStyle={{
          borderColor: Colors.grey_lime,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{
          borderColor: Colors.grey_lime,
          borderRadius: 4,
          borderWidth: 2,
        }}
        onPress={() => handleCheckboxPress(index)} // Call the function on checkbox press
        isChecked={item.checked}
        useBuiltInState={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={itemBox}
        keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
      />
      <View style={{ height: 75 }} />

      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.outlineButton, animatedStyles]}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={handleClearAll}
            >
              <Animated.Text style={[styles.outlineButtonText, animatedText]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    height: 85,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -10 },
  },
  fullButton: {
    backgroundColor: Colors.grey_lime,
    padding: 13,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  footerText: {
    color: Colors.soft_orange,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black", // explicitly set text color
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 0.2,
  },
  itemLast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  itemTextContainer: {
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  itemCount: {
    fontSize: 16,
    color: "grey",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.2,
    justifyContent: "space-between",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  outlineButton: {
    // borderColor: Colors.grey_lime,
    backgroundColor: Colors.soft_orange,
    // borderWidth: 1,
    // padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
  },
  outlineButtonText: {
    color: Colors.grey_lime,
    fontWeight: "bold",
    fontSize: 16,
  },
});
