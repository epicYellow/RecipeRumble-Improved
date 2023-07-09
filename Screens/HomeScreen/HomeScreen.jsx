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
import CompetitionBox from "../../Components/Common/CompetitionBox/CompetitionBox";
import Loader from "../../Components/Partials/Loader/Loader";
import {
  CompetitionData,
  getAllCompetitions,
} from "../../Services/CompetitionService";
import { GetCurrentUser } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { HomeStyles } from "./HomeScreenStyles";

const HomeScreen = () => {
  const [Competitions, setCompetitions] = useState([]);
  const [Submissions, setSubmissions] = useState();
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
    const allCompetitions = await getAllCompetitions();
    setCompetitions(allCompetitions);
    setLoading(false);
  };

  const user = GetCurrentUser();

  return (
    <View style={HomeStyles.Container}>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/Backgrounds/HomeBackground.jpg")}
          style={HomeStyles.TopContainer}
        >
          <ImageBackground
            style={HomeStyles.Logo}
            source={require("../../assets/Logo.png")}
          />
          <Text style={[Global.HeadingTwo, HomeStyles.Intro]}>
            Welcome back {user.displayName}
          </Text>
        </ImageBackground>

        <View style={HomeStyles.Competitions}>
          <Text style={Global.HeadingOne}>Competitions:</Text>
          <View
            style={{
              marginTop: 25,
              marginBottom: 10,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <View style={{ height: 10 }}></View>
          <Text style={[Global.HeadingThree, { textAlign: "center" }]}>
            Tap away on a competition that sparks your dish
          </Text>
          <View style={{ height: 20 }}></View>
          <Text
            style={
              Competitions.length === 0 ? Global.HeadingThree : HomeStyles.hide
            }
          >
            Just you wait! Competitions on their way.
          </Text>
          <View style={HomeStyles.innerContainerScroll}>
            <Loader loading={Loading} position={""} />
            {Competitions.map((item, index) => {
              return <CompetitionBox key={index} CompData={item} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
