import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Global } from "../../../Utils/GlobalStyles";
import { CompetitionBoxStyles } from "./CompetitionBoxStyles";

const CompetitionBox = ({ CompData, Index, allData }) => {
  const imageSource = {
    uri: CompData.Image,
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={Index}
      onPress={() => navigation.navigate("Competitions", { CompData, allData })}
      style={CompetitionBoxStyles.Container}
    >
      <Image style={CompetitionBoxStyles.Image} source={imageSource} />
      <Text style={Global.CompetitionFont}>{CompData.EventName}</Text>
      <View style={CompetitionBoxStyles.innerContainer}>
        <Image
          style={CompetitionBoxStyles.Icon}
          source={require("../../../assets/icons/Two-user.png")}
        />
        <Text style={Global.Paragraph}>{allData.length}</Text>
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
