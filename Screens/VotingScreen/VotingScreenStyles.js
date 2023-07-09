import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/ReUsables";

export const VotingScreenStyles = StyleSheet.create({
  Container: {
    // padding: 20,
  },
  TopContainer: {
    height: 140,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.Dirty_White_Dark,
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
  BottomContainer: {
    width: null,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 200,
    paddingTop: 20,
  },
});
