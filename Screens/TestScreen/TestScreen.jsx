import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CompetitionBox from "../../Components/Common/CompetitionBox/CompetitionBox";
import Voting from "../../Components/Common/VoteIng/Voting";
import Button from "../../Components/Partials/Button/Button";
import { Global } from "../../Utils/GlobalStyles";

const TestScreen = () => {
  return (
    <View>
      <Text style={Global.HeadingOne}>Heading One</Text>
      <Text style={Global.HeadingTwo}>Heading Two</Text>
      <Text style={Global.HeadingThree}>Heading Three</Text>
      <Text style={Global.Paragraph}>Paragraph</Text>
      <Button ButtonType={"Primary"} ButText={"Primary"}></Button>
      <Button ButtonType={"Secondary"} ButText={"Secondary"}></Button>
      <CompetitionBox></CompetitionBox>
      <Voting />
    </View>
  );
};

export default TestScreen;
