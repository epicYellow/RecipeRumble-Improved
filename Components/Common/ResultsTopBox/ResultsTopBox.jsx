import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { CompStyles } from "../../../Screens/CompetitionScreen/CompetitionScreenStyles";
import { Global } from "../../../Utils/GlobalStyles";
import { Colors } from "../../../Utils/ReUsables";

const ResultsTopBox = ({
  DishName,
  UserName,
  Image,
  Likes,
  Index,
  project,
}) => {
  const imageSource = {
    uri: Image,
  };
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.Container,
        {
          backgroundColor:
            Index === 0
              ? Colors.Green
              : Index === 1
              ? Colors.LightGreen
              : Index === 2
              ? Colors.Dirty_White_Dark
              : Colors.Dirty_White_Darker,
        },
      ]}
    >
      <ImageBackground style={styles.image} source={imageSource}>
        <View style={styles.score}>
          <Text>{Likes}</Text>
        </View>
      </ImageBackground>

      <View style={styles.Texts}>
        <Text style={Global.HeadingThree}>{DishName}</Text>
        <Text style={Global.Paragraph}>{UserName}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("IndRecipe", { project })}
        style={styles.ButtonVoteSub}
      >
        <View style={CompStyles.IconButtBack}>
          <ImageBackground
            style={CompStyles.IconButt}
            source={require("../../../assets/icons/Play.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ResultsTopBox;

const styles = StyleSheet.create({
  Container: {
    width: null,
    height: 80,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingRight: 10,
    marginTop: 20,
  },
  ButtonVoteSub: {
    // height: 90,
    backgroundColor: Colors.Dirty_White_Darker,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },

  image: {
    width: 80,
    height: 80,
  },
  score: {
    width: null,
    height: 18,
    backgroundColor: Colors.Green,
    marginTop: 62,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Texts: {
    width: "50%",
    height: 50,
    justifyContent: "space-around",
  },
});
