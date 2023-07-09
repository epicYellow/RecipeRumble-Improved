import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../Utils/ReUsables";

export const ProfileStyles = StyleSheet.create({
  image: {
    height: 240,
  },
  InnerContainer: {
    width: null,
    paddingTop: 35,
    height: 240,
    backgroundColor: "rgba(97, 94, 99, 0.5)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Profile: {
    width: 85,
    height: 85,
    borderRadius: 100,
    alignSelf: "center",
  },
  white: {
    color: Colors.Dirty_White,
  },
  BottomContainer: {
    height: 550,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ParticipantsResults: {
    height: 180,
  },
  innerContainerScroll: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-around",
  },
  Competitions: {
    marginTop: 30,
    height: "60%",
  },
  SaveChanges: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 36,
    backgroundColor: Colors.Green,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
