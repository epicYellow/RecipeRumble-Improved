import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DatePicker from "react-native-neat-date-picker";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import Button from "../../Components/Partials/Button/Button";
import Input from "../../Components/Partials/Input/Input";
import { createSubmission } from "../../Services/CompetitionService";
import { uploadToStorage } from "../../Services/ImageService";
import { getCurrentUserData } from "../../Services/UserService";
import { GetCurrentUser } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { NewCompScreenStyle } from "../NewCompScreen/NewCompScreenScreenStyle";
import { SubmitScreenStyle } from "./SubmitCompScreenStyle";
//TODO are you sure you want to go back when competition info is filled in
//TODO modal to show competition requirements
//TODO check if inputs are empty

const SubmitCompScreen = ({ route, navigation }) => {
  const data = route.params.project;

  console.log(data.CompId);
  const [Image, setImage] = useState("");
  const [imageNUri, setImageNUri] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [SubName, setSubName] = useState("");
  const [Description, setDescription] = useState("");
  const [Ingredient, setIngredient] = useState("");
  const [Step, setStep] = useState("");

  const [DescError, setDescError] = useState("");
  const [IngredientError, setIngredientError] = useState("");

  const [Ingredients, setIngredients] = useState([]);
  const [Steps, setSteps] = useState([]);

  const inputRef = useRef(null);

  const addRecipe = () => {
    if (Ingredient === "") {
      Alert.alert("Field can not be empty", "Please enter a requirement");
    } else {
      setIngredients((items) => [...items, Ingredient]);
      inputRef.current.clear();
    }
    //TODO check if item is already added
    //TODO max items?
  };

  const addStep = () => {
    if (Step === "") {
      Alert.alert("Field can not be empty", "Please enter a step");
    } else {
      setSteps((items) => [...items, Step]);
      inputRef.current.clear();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("IMAGE");
    console.log(JSON.stringify(result, null, 2));
    if (!result.canceled) {
      const imageSource = {
        uri: result.assets[0].uri,
      };
      setImageNUri(result.assets[0].uri);
      setImage(imageSource);
    }
    // console.log(image);
  };

  const uploadImage = async (image, name) => {
    const result = await uploadToStorage(image, `competitionImages/${name}`);
    setImageUrl(result);
    console.log(imageUrl);
    return result;
  };

  // console.log(getCurrentUserData(GetCurrentUser().email).PrevSubmissions);

  const addSubmission = async () => {
    if (SubName === "" || Description === "" || Ingredient === "") {
      setDescError("Make sure to fill in all the required fields");
    } else {
      let image = await uploadImage(
        imageNUri,
        SubName.trim().replace(/ +/g, "")
      );
      let Submission = {
        Image: image,
        SubName: SubName,
        Description: Description,
        Ingredients: Ingredients,
        Steps: Steps,
        Userid: GetCurrentUser().uid,
        UserSubName: GetCurrentUser().displayName,
        CompetitionId: data.CompId,
        Likes: 0,
      };

      const success = createSubmission(Submission, GetCurrentUser().uid);
      if (success) {
        console.log("Added Competition");
        navigation.goBack();
      } else {
        console.log("Not added Submission");
      }
    }
  };

  useEffect(() => {
    console.log(Steps);
  }, [Step]);

  return (
    <View style={SubmitScreenStyle.Container}>
      <ScrollView>
        <ImageBackground
          style={SubmitScreenStyle.Image}
          source={require("../../assets/Backgrounds/CompSubmitBack.jpg")}
        >
          <BackButton />
          <View style={SubmitScreenStyle.InfoContainer}>
            <Text style={Global.HeadingTwo}>Submit a Recipe</Text>
          </View>
        </ImageBackground>
        <View style={SubmitScreenStyle.InputContainer}>
          {Image === "" ? (
            <ImageBackground
              style={NewCompScreenStyle.addImageInner}
              source={require("../../assets/icons/Gallery.png")}
            ></ImageBackground>
          ) : (
            <ImageBackground
              resizeMode={"cover"}
              style={NewCompScreenStyle.addImage}
              source={Image}
            ></ImageBackground>
          )}

          <Button
            OnPress={pickImage}
            ButtonType={"Secondary"}
            ButText={"Add Image"}
          />
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <Input
            Place={"Submission Name"}
            Type={"default"}
            Icon={"Edit"}
            SecureEntry={false}
            setProp={setSubName}
            Error={""}
          />
          <View
            style={{
              marginTop: 10,
              marginBottom: 30,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <Text style={Global.HeadingThree}>Ingredients:</Text>
          <View style={SubmitScreenStyle.IngredientsContainer}>
            {Ingredients.length === 0 ? (
              <Text>Add ingredients below!</Text>
            ) : (
              Ingredients.map((Item, index) => (
                <View key={index} style={NewCompScreenStyle.IngredientView}>
                  <Text>{Item}</Text>
                </View>
              ))
            )}
          </View>
          <Input
            Place={"Ingredient name"}
            Type={"default"}
            Icon={"Edit"}
            SecureEntry={false}
            setProp={setIngredient}
            Error={""}
            Ref={inputRef}
          />
          <Button
            OnPress={addRecipe}
            ButtonType={"Secondary"}
            ButText={"Add Ingredient"}
          />
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <Text style={Global.HeadingThree}>Steps:</Text>
          <View style={NewCompScreenStyle.StepsContainer}>
            {Steps.length === 0 ? (
              <Text>Add rules below!</Text>
            ) : (
              Steps.map((Item, index) => (
                <View key={index} style={NewCompScreenStyle.StepsView}>
                  <Text>
                    {index + 1}. {Item}
                  </Text>
                </View>
              ))
            )}
          </View>
          <Input
            Place={"Step desc"}
            Type={"default"}
            Icon={"Edit"}
            SecureEntry={false}
            setProp={setStep}
            Error={""}
            Ref={inputRef}
          />
          <Button
            OnPress={addStep}
            ButtonType={"Secondary"}
            ButText={"Add Step"}
          />
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
          />
          <Input
            Place={"Submission Description"}
            Type={"default"}
            Icon={"Edit"}
            SecureEntry={false}
            setProp={setDescription}
            Error={""}
          />

          <Text style={{ color: Colors.Red, paddingBottom: 10 }}>
            {DescError}
          </Text>

          <Button
            OnPress={addSubmission}
            ButtonType={"Primary"}
            ButText={"Submit"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SubmitCompScreen;
