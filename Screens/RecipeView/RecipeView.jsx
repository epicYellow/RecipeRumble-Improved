import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import { Global } from "../../Utils/GlobalStyles";
import { RecipeViewStyles } from "./RecipeViewStyle";

const RecipeView = ({ route }) => {
  const { VoteData } = route.params;
  console.log("RecipeView");
  console.log("VoteData: " + VoteData.SubName);

  return (
    <View style={RecipeViewStyles.Container}>
      <View style={RecipeViewStyles.TopContainer}>
        <BackButton />
        <View style={{ width: null, paddingLeft: "10%" }}>
          <Text style={Global.HeadingTwo}>"lolos"</Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeView;
