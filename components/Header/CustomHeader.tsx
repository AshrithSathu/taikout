import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import SearchBar from "./SearchBar";
import BottomSheet from "../BottomSheet/BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import TopHeader from "./TopHeader";

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TopHeader openModal={openModal} />
        <SearchBar />
        <BottomSheet ref={bottomSheetRef} />
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: Colors.grey_lime,
  },
  container: {
    gap: 6,
    height: 100,
    backgroundColor: Colors.grey_lime,
  },
  bike: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    color: Colors.soft_orange,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.soft_orange,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 20,
  },
  profileButton: {
    backgroundColor: Colors.soft_orange,
    borderRadius: 50,
    padding: 10,
  },
});
