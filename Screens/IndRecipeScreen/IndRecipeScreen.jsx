import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import { getSubmissionsById } from "../../Services/CompetitionService";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { NewCompScreenStyle } from "../NewCompScreen/NewCompScreenScreenStyle";
import { IndRecipeScreenStyles } from "./IndRecipeScreenStyles";

const IndRecipeScreen = ({ route, navigation }) => {
  const project = route.params.VoteData;
  console.log(project);

  const [Competitions, setCompetitions] = useState([]);
  const [Loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getAll();
      return () => {};
    }, [])
  );

  const getAll = async () => {
    setLoading(true);
    console.log("getting data");
    const allCompetitions = await getSubmissionsById(project.CompId);
    setCompetitions(allCompetitions);
    console.log(allCompetitions);
  };

  const imageSource = {
    uri: project.Image,
  };

  let CompDate = new Date();
  CompDate.setDate();

  return (
    <View style={IndRecipeScreenStyles.Container}>
      <ScrollView>
        <ImageBackground
          style={IndRecipeScreenStyles.Image}
          source={imageSource}
        >
          <BackButton />
          <View style={IndRecipeScreenStyles.InfoContainer}>
            <Text style={Global.HeadingTwo}>{project.SubName}</Text>
          </View>
        </ImageBackground>
        <View style={IndRecipeScreenStyles.BottomContainer}>
          <View style={IndRecipeScreenStyles.Description}>
            <Text style={[Global.Paragraph]}>{project.Description}</Text>
          </View>

          <View style={Global.GrayLine} />

          <Text style={Global.HeadingTwo}>Ingredients</Text>
          <View style={NewCompScreenStyle.IngredientsContainer}>
            {project.Ingredients.map((Item, index) => (
              <View key={index} style={NewCompScreenStyle.IngredientView}>
                <Text>{Item}</Text>
              </View>
            ))}
          </View>
          <Text style={Global.HeadingTwo}>Steps</Text>
          <View style={NewCompScreenStyle.StepsContainer}>
            {project.Steps.map((Item, index) => (
              <View key={index} style={NewCompScreenStyle.StepsView}>
                <Text>
                  {index + 1}. {Item}
                </Text>
              </View>
            ))}
          </View>

          <View style={Global.GrayLine} />
        </View>
        <View style={IndRecipeScreenStyles.ButtonVoteSub}>
          {/* TODO only one submission allowed*/}
          <Text
            style={[Global.HeadingTwo, IndRecipeScreenStyles.ButtonTextTwo]}
          >
            Likes
          </Text>
          <View style={IndRecipeScreenStyles.IconButtBack}>
            <Text style={Global.HeadingTwo}>{project.Likes}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default IndRecipeScreen;
