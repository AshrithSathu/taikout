import { StyleSheet, Text, View } from "react-native";
import React from "react";

const filter = () => {
  return (
    <View style={styles.container}>
      <Text>filter</Text>
    </View>
  );
};

export default filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "",
  },
});
