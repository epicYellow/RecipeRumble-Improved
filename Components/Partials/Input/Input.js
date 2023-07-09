import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Global } from "../../../Utils/GlobalStyles";
import { Colors } from "../../../Utils/ReUsables";

const Input = ({ Icon, Place, Type, SecureEntry, setProp, Error, Ref }) => {
  return (
    <View>
      <View style={styles.Container}>
        <Image
          style={styles.Icon}
          source={
            Icon === "User"
              ? require("../../../assets/icons/User.png")
              : Icon === "Lock"
              ? require("../../../assets/icons/Lock.png")
              : Icon === "Mail"
              ? require("../../../assets/icons/Mail.png")
              : Icon === "UserRed"
              ? require("../../../assets/icons/UserRed.png")
              : Icon === "LockRed"
              ? require("../../../assets/icons/LockRed.png")
              : Icon === "MailRed"
              ? require("../../../assets/icons/MailRed.png")
              : Icon === "Edit"
              ? require("../../../assets/icons/Edit.png")
              : require("../../../assets/icons/User.png")
          }
        />
        <TextInput
          ref={Ref}
          style={styles.InputStyle}
          editable
          placeholder={Place}
          keyboardType={Type}
          secureTextEntry={SecureEntry}
          onChangeText={(newValue) => setProp(newValue)}
        />
      </View>
      <Text style={Global.Error}>{Error === "" ? "" : Error}</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  InputStyle: {
    width: 300,
    height: 46,
    padding: 10,
    borderRadius: 10,

    // backgroundColor: "red",
  },
  Container: {
    width: 340,
    backgroundColor: Colors.Dirty_White_Darker,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Icon: {
    width: 24,
    height: 24,
    resizeMode: "center",
    marginLeft: 10,
    marginRight: 5,
  },
});
