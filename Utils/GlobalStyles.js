import { StyleSheet } from "react-native";
import { Colors } from "./ReUsables";

export const Global = StyleSheet.create({
  HeadingOne: {
    fontFamily: "ubuntu_bold",
    fontSize: 36,
    color: Colors.Gray,
  },
  HeadingTwo: {
    fontFamily: "ubuntu_bold",
    fontSize: 28,
    color: Colors.Gray,
  },
  HeadingThree: {
    fontFamily: "ubuntu_italic",
    fontSize: 22,
    color: Colors.Gray,
  },
  ButtonFont: {
    fontFamily: "karla_bold",
    fontSize: 20,
    color: Colors.Gray,
  },
  CompetitionFont: {
    fontFamily: "karla_italic",
    fontSize: 18,
    width: "80%",
    height: 50,
    color: Colors.Gray,
  },
  Paragraph: {
    fontFamily: "karla",
    fontSize: 16,
    color: Colors.Gray,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  Error: {
    fontFamily: "karla_bold",
    fontSize: 12,
    paddingBottom: 7,
    paddingLeft: 15,
    color: Colors.Red,
  },
  separator: {
    marginTop: 25,
    marginBottom: 10,
    width: "90%",
    borderBottomColor: Colors.Gray,
    borderBottomWidth: 0.5,
  }
});
