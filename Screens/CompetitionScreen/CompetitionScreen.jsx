import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { NewCompScreenStyle } from "../NewCompScreen/NewCompScreenScreenStyle";
import { CompStyles } from "./CompetitionScreenStyles";

const CompetitionScreen = ({ route, navigation }) => {
  const project = route.params.CompData;
  const allData = route.params.allData;

  const deviceDateTime = new Date();
  const CompEndDate = new Date(project.EndDate);
  const CompStartDate = new Date(project.StartDate);

  const date1 = new Date(deviceDateTime);
  const date2 = new Date(CompEndDate);

  const timeDifference = CompEndDate.getTime() - deviceDateTime.getTime();
  const totalTimeSpan = CompEndDate.getTime() - CompStartDate.getTime();

  const remainingTime = totalTimeSpan - timeDifference;
  const percentageProgress = (remainingTime / totalTimeSpan) * 100;

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

  const imageSource = {
    uri: project.Image,
  };

  let CompDate = new Date();
  CompDate.setDate();

  return (
    <View style={CompStyles.Container}>
      <ScrollView>
        <ImageBackground style={CompStyles.Image} source={imageSource}>
          <BackButton />
          <View style={CompStyles.InfoContainer}>
            <Text style={Global.HeadingTwo}>{project.EventName}</Text>
            <View style={CompStyles.innerContainer}>
              <Image
                style={CompStyles.Icon}
                source={require("../../assets/icons/Two-user.png")}
              />
              <Text style={Global.Paragraph}>
                {allData.length === 0 ? 0 : allData.length}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={CompStyles.BottomContainer}>
          <View style={CompStyles.Description}>
            <Text style={[Global.Paragraph]}>{project.Description}</Text>
          </View>

          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              alignSelf: "center",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />

          <Text style={Global.HeadingTwo}>Requirements</Text>
          <View style={NewCompScreenStyle.IngredientsContainer}>
            {project.Requirements.map((Item, index) => (
              <View key={index} style={NewCompScreenStyle.IngredientView}>
                <Text>{Item}</Text>
              </View>
            ))}
          </View>

          <Text style={Global.HeadingTwo}>Rules</Text>

          <View style={NewCompScreenStyle.StepsContainer}>
            {project.Rules.map((Item, index) => (
              <View key={index} style={NewCompScreenStyle.StepsView}>
                <Text>
                  {index + 1}. {Item}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              alignSelf: "center",

              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />

          <View style={CompStyles.SubmissionSection}>
            <Text style={Global.HeadingTwo}>Submissions:</Text>
            <Text style={Global.HeadingTwo}>
              {" "}
              {allData.length === 0 ? 0 : allData.length}
            </Text>
          </View>

          <Text style={Global.HeadingThree}>
            {date1 < date2
              ? `${daysLeft} day(s), ${hoursLeft} hours left`
              : "Competition dusted!"}
          </Text>

          <View style={date1 < date2 ? "" : CompStyles.hide}>
            <View style={CompStyles.ProgressOuter}>
              <View
                style={[
                  CompStyles.ProgressInner,
                  {
                    width: `${percentageProgress.toFixed(2)}%`,
                    backgroundColor:
                      percentageProgress.toFixed(2) < 75
                        ? Colors.Green
                        : Colors.Red,
                  },
                ]}
              ></View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Voting", { project })}
              style={CompStyles.ButtonVoteSub}
            >
              <ImageBackground
                style={CompStyles.IconButt}
                source={require("../../assets/icons/HeartDark.png")}
              />
              <Text style={[Global.HeadingTwo, CompStyles.ButtonText]}>
                Vote
              </Text>
              <View style={CompStyles.IconButtBack}>
                <ImageBackground
                  style={CompStyles.IconButt}
                  source={require("../../assets/icons/Play.png")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SubmitComp", { project })}
              style={CompStyles.ButtonVoteSub}
            >
              <ImageBackground
                style={CompStyles.IconButt}
                source={require("../../assets/icons/HeartDark.png")}
              />
              {/* TODO only one submission allowed*/}
              <Text style={[Global.HeadingTwo, CompStyles.ButtonText]}>
                Submit
              </Text>
              <View style={CompStyles.IconButtBack}>
                <ImageBackground
                  style={CompStyles.IconButt}
                  source={require("../../assets/icons/Play.png")}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={date1 < date2 ? CompStyles.hide : ""}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Results", { project })}
              style={CompStyles.ButtonVoteSub}
            >
              {/* TODO only one submission allowed*/}
              <Text style={[Global.HeadingTwo, CompStyles.ButtonTextTwo]}>
                LeaderBoard
              </Text>
              <View style={CompStyles.IconButtBack}>
                <ImageBackground
                  style={CompStyles.IconButt}
                  source={require("../../assets/icons/Sort.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompetitionScreen;
