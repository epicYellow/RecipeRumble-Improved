import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../Components/Partials/Button/Button";
import Input from "../../Components/Partials/Input/Input";
import Loader from "../../Components/Partials/Loader/Loader";
import { LogInFun } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { LoginStyles } from "./LoginStyles";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [Loading, setLoading] = useState(false);

  const LogIn = async () => {
    // console.log("Logging in");
    setLoading(true);

    if (email === "") {
      setemailError("Please enter your email");
      setLoading(false);
    }
    if (password === "") {
      setpasswordError("Please enter a password");
      setLoading(false);
    }
    if (email !== "" && password !== "") {
      await LogInFun(email, password).then(() => {
        setLoading(false);
      });
    }
  };

  return (
    <ScrollView style={LoginStyles.Container}>
      <Loader loading={Loading} position={"abso"} />
      <ImageBackground
        style={LoginStyles.Image}
        source={require("../../assets/Backgrounds/Carrot_BackGround.png")}
      >
        <Image
          style={LoginStyles.Logo}
          source={require("../../assets/Logo.png")}
        />
      </ImageBackground>

      <View style={LoginStyles.BottomContainer}>
        <View
          style={{
            marginBottom: 35,
            alignSelf: "flex-start",
          }}
        >
          <Text style={[Global.HeadingOne, LoginStyles.Headings]}>
            Welcome back
          </Text>
          <Text style={[Global.HeadingThree, LoginStyles.Headings]}>
            Login to continue
          </Text>
        </View>

        <View style={{ marginTop: "10%" }}></View>

        <View style={LoginStyles.InputContainer}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Input
              Place={"Email"}
              Type={"email-address"}
              Icon={emailError === "" ? "User" : "UserRed"}
              Error={emailError}
              setProp={setEmail}
              SecureEntry={false}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Input
              Place={"Password"}
              Type={"default"}
              Icon={passwordError === "" ? "Lock" : "LockRed"}
              Error={passwordError}
              setProp={setPassword}
              SecureEntry={true}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={{ marginTop: "20%" }}></View>

        <Button OnPress={LogIn} ButtonType={"Primary"} ButText={"Login"} />

        <View
          style={{
            flexDirection: "row",
            padding: 10,
            marginTop: 35,
            justifyContent: "space-around",
          }}
        >
          <Text style={Global.CompetitionFont}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[LoginStyles.AccountBold, { color: Colors.Red }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
