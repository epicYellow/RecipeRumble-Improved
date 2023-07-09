import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../Utils/ReUsables";

const Navigation = () => {
  return (
    <View style={styles.Container}>
      <Image
        style={styles.Icon}
        source={require("../../../assets/icons/ArrowLeft.png")}
      />
      <Image
        style={styles.Icon}
        source={require("../../../assets/icons/Home.png")}
      />
      {/* <Image style={styles.Icon} source={require("../../../assets/icons/Setting.png")}/> */}
      <Image
        style={styles.Profile}
        source={require("../../../assets/ProfileTemp.jpg")}
      />
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    width: "100%",
    height: 65,
    backgroundColor: "red",
    alignSelf: "center",
    bottom: 0,
    borderRadius: 10,
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  Profile: {
    width: 44,
    height: 44,
    borderRadius: 100,
  },
  Icon: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
});
