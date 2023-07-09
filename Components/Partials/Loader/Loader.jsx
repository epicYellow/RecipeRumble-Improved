import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../Utils/ReUsables";

const Loader = ({ loading, position }) => {
  return (
    <View
      style={[
        loading
          ? position === "abso"
            ? styles.Loading
            : styles.LoadingNonPos
          : styles.hidden,
      ]}
    >
      <ImageBackground
        ref={(image) => {
          this.sectorImage = image;
        }}
        style={{
          width: 90,
          height: 90,
        }}
        source={require("../../../assets/icons/Loader.gif")}
      ></ImageBackground>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  Loading: {
    width: 100,
    height: 100,
    alignSelf: "center",
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    zIndex: 999,
    bottom: "40%",
  },
  LoadingNonPos: {
    width: 100,
    height: 100,
    alignSelf: "center",
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 999,
  },
  hidden: {
    display: "none",
  },
});
