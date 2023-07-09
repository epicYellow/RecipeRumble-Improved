import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const LoginStyles = StyleSheet.create({
  Container: {
    height: "100%",
  },
  Image: {
    height: 200,
    paddingTop: 40,
    width: null,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Logo: {
    width: 110,
    height: 110,
  },
  BottomContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  AccountBold: {
    fontFamily: "ubuntu_bold",
    fontSize: 20,
    width: 80,
    textAlign: "right",
    color: Colors.Dirty_White,
  },
  InputContainer: {
    height: 120,
    justifyContent: "space-between",
  },
  Headings: {
    textAlign: "left",
  },
  DontHaveAccountSec: {
    flexDirection: "row",
    padding: 10,
    marginTop: 35,
    justifyContent: "space-around",
  },
});
