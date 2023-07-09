import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Alert,
  AlertIOS,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import DatePicker from "react-native-neat-date-picker";
import BackButton from "../../Components/Partials/BackButton/BackButton";
import Button from "../../Components/Partials/Button/Button";
import Input from "../../Components/Partials/Input/Input";
import {
  createCompetition,
  createSubmission,
} from "../../Services/CompetitionService";
import { uploadToStorage } from "../../Services/ImageService";
import { GetCurrentUser } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { NewCompScreenStyle } from "./NewCompScreenScreenStyle";

//TODO are you sure you want to go back when competition info is filled in
//TODO modal to show competition requirements
//TODO check if inputs are empty

const NewCompScreen = ({ navigation }) => {
  const [Image, setImage] = useState("");
  const [imageNUri, setImageNUri] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [SubName, setSubName] = useState("");
  const [Description, setDescription] = useState("");
  const [Ingredient, setIngredient] = useState("");
  const [Step, setStep] = useState("");

  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [showDatePickerRange, setShowDatePickerRange] = useState(false);

  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  function notifyMessage() {
    if (Platform.OS === "android") {
      ToastAndroid.show("Field can't be empty", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("Field can't be empty");
    }
  }

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
  };

  const uploadImage = async (image, name) => {
    const result = await uploadToStorage(image, `competitionImages/${name}`);
    setImageUrl(result);
    console.log(imageUrl);
    return result;
  };

  const addSubmission = async () => {
    if (
      SubName === "" ||
      Description === "" ||
      Ingredient === "" ||
      startDate === ""
    ) {
      setDescError("Make sure to fill in all the required fields");
    } else {
      let image = await uploadImage(
        imageNUri,
        SubName.trim().replace(/ +/g, "")
      );
      let Submission = {
        Image: image,
        Date: date,
        StartDate: startDate,
        EndDate: endDate,
        EventName: SubName,
        Description: Description,
        Requirements: Ingredients,
        Rules: Steps,
        UserSubName: GetCurrentUser().displayName,
        Ongoing: true,
        Submissions: [],
        Userid: GetCurrentUser().uid,
      };

      const success = createCompetition(Submission);
      if (success) {
        console.log("Added Submission");
        navigation.goBack();
      } else {
        console.log("Not added Submission");
      }
    }
  };

  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  // const openDatePickerRange = () => setShowDatePickerRange(true);

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    console.log(output);
    setDate(output.dateString);
    setStartDate(output.startDateString);
    setEndDate(output.endDateString);
  };

  return (
    <View style={NewCompScreenStyle.Container}>
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={"range"}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
      />

      <ScrollView>
        <ImageBackground
          style={NewCompScreenStyle.Image}
          source={require("../../assets/Backgrounds/NewCompBack.jpg")}
        >
          <BackButton />
          <View style={NewCompScreenStyle.InfoContainer}>
            <Text style={Global.HeadingTwo}>New Event</Text>
          </View>
        </ImageBackground>
        <View style={NewCompScreenStyle.InputContainer}>
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
            Place={"Competition/Event Name"}
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
          <Text style={Global.HeadingThree}>Required Ingredients:</Text>
          <View style={NewCompScreenStyle.IngredientsContainer}>
            {Ingredients.length === 0 ? (
              <Text>Add required ingredients below!</Text>
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
            ButText={"Add Requirement"}
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
          <Text style={Global.HeadingThree}>Rules(Optional):</Text>
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
            Place={"Rule desc"}
            Type={"default"}
            Icon={"Edit"}
            SecureEntry={false}
            setProp={setStep}
            Error={""}
            Ref={(input) => {
              this.textInput = input;
            }}
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

          {/* //TODO make sure date is not in past*/}

          <Text style={Global.HeadingThree}>
            {startDate && `${startDate} ~ ${endDate}`}
          </Text>

          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Button
            OnPress={openDatePickerSingle}
            ButtonType={"Secondary"}
            ButText={"Close Date Range"}
          />

          <View
            style={{
              marginTop: 10,
              marginBottom: 5,
            }}
          />

          <Text style={Global.Paragraph}>
            Note: Competitions that run only for one day will be considered as
            events
          </Text>

          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              width: "90%",
              borderBottomColor: Colors.Gray,
              borderBottomWidth: 0.5,
            }}
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

export default NewCompScreen;
