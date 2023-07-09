import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Global } from "../../../Utils/GlobalStyles";
import { ButtonStyles } from "./ButtonStyles";

const Button = ({ ButText, ButtonType, OnPress, Styling }) => {
  return (
    <TouchableOpacity
      onPress={() => OnPress()}
      style={
        ButtonType === "Primary"
          ? ButtonStyles.primary
          : ButtonType === "Secondary"
          ? ButtonStyles.secondary
          : ""
      }
    >
      <Text style={[Global.ButtonFont, Styling]}>{ButText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
