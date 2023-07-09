import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import CompetitionBox from "../../Components/Common/CompetitionBox/CompetitionBox";
import Loader from "../../Components/Partials/Loader/Loader";
import { getAllCompetitions } from "../../Services/CompetitionService";
import { GetCurrentUser } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { HomeStyles } from "./HomeScreenStyles";

const HomeScreen = () => {
  const [Competitions, setCompetitions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getAll();
    }, [])
  );

  const getAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const allCompetitions = await getAllCompetitions();
      setCompetitions(allCompetitions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <View style={global.separator} />
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

            {error ? (
              <Text style={Global.Paragraph}>Error: {error}</Text>
            ) : (
              <>
                {Competitions.map((item, index) => {
                  return (
                    <CompetitionBox key={index} Index={index} CompData={item} />
                  );
                })}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
