import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeStyles } from "../../../Screens/HomeScreen/HomeScreenStyles";
import { getSubmissionsById } from "../../../Services/CompetitionService";
import { Global } from "../../../Utils/GlobalStyles";
import { CompetitionBoxStyles } from "./CompetitionBoxStyles";

const CompetitionBox = ({ CompData, route }) => {
  console.log("LOLLOS");
  console.log(CompData.CompId);
  const imageSource = {
    uri: CompData.Image,
  };
  const [Competitions, setCompetitions] = useState([]);

  const navigation = useNavigation();

  //TODO:Rather not this
  useFocusEffect(
    useCallback(() => {
      //get data when viewing screen
      getAll();
      return () => {
        //clean up
        // console.log("not in view");
      };
    }, [])
  );

  const getAll = async () => {
    console.log("getting data");
    const allCompetitions = await getSubmissionsById(CompData.CompId);
    setCompetitions(allCompetitions);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Competitions", { CompData })}
      style={CompetitionBoxStyles.Container}
    >
      <Image style={CompetitionBoxStyles.Image} source={imageSource} />
      <Text style={Global.CompetitionFont}>{CompData.EventName}</Text>
      <View style={CompetitionBoxStyles.innerContainer}>
        <Image
          style={CompetitionBoxStyles.Icon}
          source={require("../../../assets/icons/Two-user.png")}
        />
        <Text style={Global.Paragraph}>{Competitions.length}</Text>
        <View style={CompetitionBoxStyles.HorSpacer}></View>
        <View style={CompetitionBoxStyles.IconButtBack}>
          <Image
            style={CompetitionBoxStyles.Icon}
            source={require("../../../assets/icons/Play.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompetitionBox;
