import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../Utils/ReUsables";

const BackButton = ({ Route }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.BackButton}
    >
      <Image
        style={styles.BackImage}
        source={require("../../../assets/icons/ArrowLeft.png")}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  BackButton: {
    width: 45,
    height: 45,
    backgroundColor: Colors.Dirty_White_Darker,
    alignSelf: "baseline",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
  },
  BackImage: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
});
