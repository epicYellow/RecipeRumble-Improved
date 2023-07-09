import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { updateLike } from "../../../Services/CompetitionService";
import { Global } from "../../../Utils/GlobalStyles";
import { VotingStyles } from "./VotingStyles";

const Voting = ({ VoteData }) => {
  //useMemo
  console.log(VoteData);
  const [Voted, setVoted] = useState(false);
  const [ShowDesc, setShowDesc] = useState(true);
  const [voteCount, setVoteCount] = useState(0);

  const navigation = useNavigation();

  const Vote = () => {
    setVoteCount((value) => (value < 1 ? value + 1 : value));
    if (voteCount < 1 && !Voted) {
      setTimeout(function () {
        console.log("Like reset");
      }, 500);
    } else if (voteCount === 1 && !Voted) {
      console.log("Not Voted");
      updateLike(
        VoteData.SubID,
        VoteData.Image,
        VoteData.SubName,
        VoteData.Description,
        VoteData.Ingredients,
        VoteData.Userid,
        VoteData.CompetitionId,
        VoteData.Likes + 1
      );
      setVoted(true);
    } else if (voteCount === 1 && Voted) {
      console.log("Already Voted");
    }
  };

  useEffect(() => {
    if (voteCount === 2) {
      console.log("Vote count reached 2");
    }
  }, [voteCount]);

  console.log(voteCount);

  const imageSource = {
    uri: VoteData.Image,
  };

  return (
    <ImageBackground
      style={ShowDesc ? VotingStyles.Container : VotingStyles.ContainerTall}
      source={imageSource}
    >
      <TouchableOpacity
        activeOpacity={0.1}
        style={
          Voted
            ? [VotingStyles.Overlay, VotingStyles.Voted]
            : [VotingStyles.Overlay]
        }
      >
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={Vote}
          style={VotingStyles.HeartContainer}
        >
          <Image
            style={
              Voted
                ? VotingStyles.Heart
                : [VotingStyles.HeartContainer, VotingStyles.Hide]
            }
            source={require("../../../assets/icons/Heart.png")}
          />
          <Text
            style={
              Voted
                ? [Global.HeadingThree, VotingStyles.VotedText]
                : [
                    Global.HeadingThree,
                    VotingStyles.VotedText,
                    VotingStyles.Hide,
                  ]
            }
          >
            Voted!
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("IndRecipe", { VoteData })}
        activeOpacity={0.9}
        style={VotingStyles.Description}
      >
        <Text style={Global.HeadingTwo}>{VoteData.SubName}</Text>
        <View
          style={{
            width: 130,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Image
            style={VotingStyles.LeftIcon}
            source={require("../../../assets/icons/Play.png")}
          />
          <Text style={Global.Paragraph}>Read More</Text>
        </View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          {VoteData.Ingredients.map((Item, index) => (
            <View key={index} style={VotingStyles.IngredientView}>
              <Text>{`\u2022 ${Item}`}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Voting;
