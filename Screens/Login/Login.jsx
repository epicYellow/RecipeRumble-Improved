import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
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
  const [passwordError, setPasswordError] = useState("");

  const [Loading, setLoading] = useState(false);

  const LogIn = async () => {
    setLoading(true);

    if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }

    if (!email) {
      setemailError("Please enter your email");
    } else {
      setemailError("");
    }

    if (!email && !password) {
      setLoading(false);
    } else {
      try {
        await LogInFun(email, password);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
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

        <View style={{ marginVertical: 20 }}></View>

        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={LoginStyles.InputContainer}>
            <Input
              Place={"Email"}
              Type={"email-address"}
              Icon={emailError === "" ? "User" : "UserRed"}
              Error={emailError}
              setProp={setEmail}
              SecureEntry={false}
            />

            <Input
              Place={"Password"}
              Type={"default"}
              Icon={passwordError === "" ? "Lock" : "LockRed"}
              Error={passwordError}
              setProp={setPassword}
              SecureEntry={true}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={{ marginVertical: 40 }}></View>

        <Button OnPress={LogIn} ButtonType={"Primary"} ButText={"Login"} />

        <View style={LoginStyles.DontHaveAccountSec}>
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
