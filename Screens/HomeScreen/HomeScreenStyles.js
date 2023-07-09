import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/ReUsables";

export const HomeStyles = StyleSheet.create({
  Container: {
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  TopContainer: {
    padding: 10,
    paddingTop: 35,
    resizeMode: "cover",
    // paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 15,
    // width: null,
    height: 200,
    width: null,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    // marginBottom: 10,
  },
  Intro: {
    padding: 10,

    backgroundColor: Colors.Dirty_White_Darker,
    padding: 20,
    width: 220,
    borderRadius: 10,
    marginLeft: "10%",
  },
  Logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  Competitions: {
    padding: 10,

    width: null,
    // paddingBottom: 60,
  },
  hide: {
    display: "none",
  },
  IconButt: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  IconButtBack: {
    width: 55,
    height: 55,
    backgroundColor: Colors.Dirty_White_Dark,
    borderRadius: 10,
    shadowColor: "#464646",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: 60,
    height: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  BottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ButtonVoteSub: {
    marginTop: 25,
    marginBottom: 35,
    width: "100%",
    height: 90,
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  Description: {
    height: 120,
  },
  ButtonText: {
    width: 125,
  },
  innerContainerScroll: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
