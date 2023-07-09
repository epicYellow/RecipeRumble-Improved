import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ResultsTopBox from "../../Components/Common/ResultsTopBox/ResultsTopBox";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import Button from "../../Components/Partials/Button/Button";
import { getSubmissionsById } from "../../Services/CompetitionService";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { CompStyles } from "../CompetitionScreen/CompetitionScreenStyles";
import { ResultsStyles } from "./ResultsScreenStyles";

const ResultsScreen = ({ route }) => {
  let project = route.params.project;
  console.log(project);
  const navigation = useNavigation();

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
    const allCompetitions = await getSubmissionsById(project.CompId);
    setCompetitions(allCompetitions);
    console.log(allCompetitions);
  };

  const imageSource = {
    uri: project.Image,
  };

  return (
    <View style={ResultsStyles.Container}>
      <ScrollView>
        <ImageBackground
          style={ResultsStyles.Image}
          source={require("../../assets/Backgrounds/LeaderBoard.jpg")}
        >
          <BackButton />
          <View style={ResultsStyles.InfoContainer}>
            <Text style={Global.HeadingTwo}>{project.EventName}</Text>
            <View style={ResultsStyles.innerContainer}>
              <Image
                style={ResultsStyles.Icon}
                source={require("../../assets/icons/Two-user.png")}
              />
              <Text style={Global.Paragraph}>
                {Competitions.length === 0 ? 0 : Competitions.length}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={ResultsStyles.BottomContainer}>
          <Text style={Global.HeadingTwo}>Top 3 Dishes:</Text>
          <View
            style={{
              marginTop: 25,
              marginBottom: 10,
              width: "90%",
              alignSelf: "center",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          {Competitions.sort((a, b) => b.Likes - a.Likes).map((item, index) => (
            <ResultsTopBox
              project={item}
              key={index}
              DishName={item.SubName}
              UserName={item.UserSubName}
              Image={item.Image}
              Likes={item.Likes}
              Index={index}
            />
          ))}
          <View
            style={{
              marginTop: 35,
              marginBottom: 20,
              width: "90%",
              alignSelf: "center",

              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <Text style={Global.HeadingTwo}>LeaderBoard</Text>
          {Competitions.sort((a, b) => b.Likes - a.Likes).map((item, index) => (
            <View style={[ResultsStyles.LeaderItem, Global.HeadingTwo]}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.SubName}</Text>
                <Text>Likes: {item.Likes}</Text>
              </View>
              <View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text>{item.UserSubName}</Text>
                  <View
                    style={{
                      width: "80%",
                      // backgroundColor: Colors.Dirty_White,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {item.Ingredients.filter((item, index) => index < 2).map(
                      (Ingredient) => (
                        <Text key={index}>{Ingredient}</Text>
                      )
                    )}
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  borderBottomColor: Colors.Gray,
                  borderBottomWidth: 0.5,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultsScreen;
