import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import ProfileSubmissions from "../../Components/Common/ProfileSubmissions/ProfileSubmissions";
import Button from "../../Components/Partials/Button/Button";
import Loader from "../../Components/Partials/Loader/Loader";
import {
  getAllCompetitions,
  getSubmissionsById,
  getSubmissionsByUserId,
} from "../../Services/CompetitionService";
import { uploadToStorage } from "../../Services/ImageService";
import { getCurrentUserData, updateProfile } from "../../Services/UserService";
import { GetCurrentUser, LogOut } from "../../Services/firebaseAuth";
import { auth } from "../../Utils/Firebase";
import { Global } from "../../Utils/GlobalStyles";
import { HomeStyles } from "../HomeScreen/HomeScreenStyles";
import { ProfileStyles } from "./ProfileScreenStyle";

const ProfileScreen = ({ navigation }) => {
  const user = GetCurrentUser();
  const storage = getStorage();

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(user.photoURL);
  const [imageNUri, setImageNUri] = useState("");

  const [Competitions, setCompetitions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingTwo, setLoadingTwo] = useState(false);

  const imageSource = {
    uri: imageUrl,
  };

  const imageSourceTwo = {
    uri: image,
  };

  const UpdateUserProfile = async () => {
    await updateProfile(auth.currentUser, {
      photoURL: imageUrl,
    });
  };

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
    const allCompetitions = await getSubmissionsByUserId(GetCurrentUser().uid);
    setCompetitions(allCompetitions);
    setLoading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(JSON.stringify(result, null, 2));
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageNUri(result.assets[0].uri);
    }
    console.log(image);
  };

  const uploadImage = async () => {
    setLoadingTwo(true);
    const result = await uploadToStorage(
      imageNUri,
      `competitionImages/${GetCurrentUser().displayName}`
    );
    setImageUrl(result);
    console.log(imageUrl);
    UpdateUserProfile();
    setImage("");
    setLoadingTwo(false);
    return result;
  };

  return (
    <View>
      <ScrollView>
        <Loader loading={LoadingTwo} position={"abso"} />

        <ImageBackground
          style={ProfileStyles.image}
          source={require("../../assets/Backgrounds/Orange_Background.png")}
        >
          <View style={ProfileStyles.InnerContainer}>
            <TouchableHighlight
              style={{ borderRadius: 15 }}
              onPress={pickImage}
            >
              {image === "" ? (
                <Image style={ProfileStyles.Profile} source={imageSource} />
              ) : (
                <>
                  <Image
                    style={ProfileStyles.Profile}
                    source={imageSourceTwo}
                  />
                  <TouchableHighlight
                    onPress={uploadImage}
                    style={[ProfileStyles.SaveChanges, Global.HeadingThree]}
                  >
                    <Text>Save Changes</Text>
                  </TouchableHighlight>
                </>
              )}
            </TouchableHighlight>

            <View>
              <Text style={[Global.HeadingTwo, ProfileStyles.white]}>
                {user.displayName}
              </Text>
              <Text style={[Global.HeadingThree, ProfileStyles.white]}>
                {user.email}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={ProfileStyles.BottomContainer}>
          <Text style={Global.HeadingTwo}>Previous Submissions:</Text>
          <View style={ProfileStyles.Competitions}>
            <ScrollView>
              <View style={ProfileStyles.innerContainerScroll}>
                <Loader loading={Loading} position={""} />

                {Competitions.map((items) => (
                  <ProfileSubmissions
                    Image={items.Image}
                    Likes={items.Likes}
                    VoteData={items}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
          <Button
            OnPress={LogOut}
            ButtonType={"Secondary"}
            ButText={"Log Out"}
          />
          {/* //TODO make more interesting */}
          <Button
            OnPress={() => navigation.navigate("NewComp")}
            ButtonType={"Primary"}
            ButText={"Make Competition!"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
