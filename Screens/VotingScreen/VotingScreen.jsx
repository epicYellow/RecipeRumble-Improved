import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CompetitionBox from "../../Components/Common/CompetitionBox/CompetitionBox";
import Voting from "../../Components/Common/VoteIng/Voting";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import Button from "../../Components/Partials/Button/Button";
import Loader from "../../Components/Partials/Loader/Loader";
import { getSubmissionsById } from "../../Services/CompetitionService";
import { Global } from "../../Utils/GlobalStyles";
import CompetitionScreen from "../CompetitionScreen/CompetitionScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import { VotingScreenStyles } from "./VotingScreenStyles";

const VotingScreen = ({ route }) => {
  const data = route.params.project;
  const [Competitions, setCompetitions] = useState([]);
  const [Loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      //get data when viewing screen
      getAll();
      return () => {
        //clean up
        console.log("not in view");
      };
    }, [])
  );

  const getAll = async () => {
    setLoading(true);
    console.log("getting data");
    const allCompetitions = await getSubmissionsById(data.CompId);
    setCompetitions(allCompetitions);
    console.log(allCompetitions);
  };

  useEffect(() => {
    if (Competitions.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Competitions]);

  return (
    <View style={VotingScreenStyles.Container}>
      <View style={VotingScreenStyles.TopContainer}>
        <BackButton />
        <View style={{ width: null, paddingLeft: "10%" }}>
          <Text style={Global.HeadingTwo}>{data.EventName}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={VotingScreenStyles.BottomContainer}>
          {Competitions.map((item, index) => (
            <Voting key={index} VoteData={item} />
          ))}

          <View
            style={{
              height: 250,
              alignItems: "center",
              justifyContent: "space-around",
              // marginTop: 20,
              // backgroundColor: "red",
            }}
          >
            <Loader loading={Loading} position={""} />
            <Text style={Global.HeadingThree}>
              {Loading ? "Loading" : "The end!"}
            </Text>
            <Button ButtonType={"Primary"} ButText={"Return to competition"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VotingScreen;
