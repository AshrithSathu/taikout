import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const TopHeader = ({ openModal }: { openModal: () => void }) => {
  return (
    <View style={styles.imageContainer}>
      <BottomSheetModalProvider>
        <TouchableOpacity onPress={openModal}>
          {/* <Image
            source={require("../../assets/images/bike.png")}
            style={styles.bike}
          /> */}
          <Ionicons name="location" size={30} color={Colors.soft_orange} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.titleText}>Manipal</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.subTitle}>Select Location</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={Colors.soft_orange}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={15} color={Colors.grey_lime} />
        </TouchableOpacity>
      </BottomSheetModalProvider>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  bike: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.soft_orange,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.soft_orange,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: 20,
  },
  profileButton: {
    backgroundColor: Colors.soft_orange,
    borderRadius: 50,
    padding: 10,
  },
});
