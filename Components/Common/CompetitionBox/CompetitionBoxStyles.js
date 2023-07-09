import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/ReUsables";

export const CompetitionBoxStyles = StyleSheet.create({
  Container: {
    width: "47%",
    height: 200,
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    float: "left",
    marginBottom: 15,
    paddingBottom: 15,
  },
  Image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    alignSelf: "stretch",
    marginBottom: 5,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  innerContainer: {
    width: "85%",
    height: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  HorSpacer: {
    width: 25,
  },
  IconButtBack: {
    width: 32,
    height: 32,
    backgroundColor: Colors.Dirty_White_Dark,
    borderRadius: 10,
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
