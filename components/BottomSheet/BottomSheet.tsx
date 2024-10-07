import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["45%"], []);

  // Custom backdrop for the BottomSheet
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={
        //make it invisible
        {
          display: "none",
        }
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}></View>
        <Text style={styles.subHeader}>Your Location</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.grey_lime}
              />

              <Text
                style={{
                  flex: 1,
                  color: Colors.grey_lime,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Select Location
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.grey_lime}
              />
            </View>
          </TouchableOpacity>
        </Link>

        <Text style={styles.subHeader}>Arrival Time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.grey_lime}
            />

            <Text
              style={{
                flex: 1,
                color: Colors.grey_lime,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Current Location
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.grey_lime}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dismiss()} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetBackground: {
    // backgroundColor: Colors.grey_lime,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: Colors.grey_lime,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    width: "75%",
    alignSelf: "center",
    bottom: 0,
  },
  buttonText: {
    color: Colors.lavender_blush,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleText: {
    color: Colors.soft_orange,
    fontWeight: "bold",
    fontSize: 16,
  },
  subHeader: {
    color: Colors.grey_lime,
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  item: {
    // backgroundColor: Colors.grey_lime,
    borderColor: Colors.grey_lime,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 15,
  },
});
