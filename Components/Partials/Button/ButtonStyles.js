import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/ReUsables";

export const ButtonStyles = StyleSheet.create({
  primary: {
    width: 340,
    height: 50,
    backgroundColor: Colors.Green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 0,
    padding: 0,
    // shadowColor: "#464646",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 5,
    // elevation: 5,
  },
  secondary: {
    width: 340,
    height: 50,
    backgroundColor: Colors.Dirty_White,
    borderWidth: 3,
    borderColor: Colors.Red,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 0,
    padding: 0,
    // shadowColor: "#464646",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 5,
    // elevation: 5,
  },
});
