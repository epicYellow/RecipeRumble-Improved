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
  Account: {
    fontFamily: "ubuntu_regular",
    fontSize: 20,
    color: Colors.Gray,
  },
  AccountBold: {
    fontFamily: "ubuntu_bold",
    fontSize: 20,
    width: 80,
    textAlign: "right",
    color: Colors.Red,
  },
  InputContainer: {
    height: 270,
    justifyContent: "space-between",
  },
});
