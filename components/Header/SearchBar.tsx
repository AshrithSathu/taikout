import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <View style={styles.input}>
          <Ionicons
            name="search-outline"
            size={18}
            color={Colors.soft_orange}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Restaurants, Grocery & Dishes"
            placeholderTextColor={Colors.soft_orange}
            style={styles.textInput}
            selectionColor={Colors.soft_orange}
          />
        </View>
      </View>
      <Link href={"/(modal)/filter"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons
            name="options-outline"
            size={20}
            color={Colors.soft_orange}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchField: {
    flex: 1,

    height: 35,
    backgroundColor: Colors.grey_lime,
    borderColor: Colors.soft_orange,
    borderWidth: 1,
    borderRadius: 15,
  },
  input: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    fontSize: 14,
    color: Colors.soft_orange,
  },
  optionButton: {
    padding: 8,
  },
  searchIcon: {
    paddingLeft: 5,
  },
});
