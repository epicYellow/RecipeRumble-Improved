import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { RegisterNewUser } from "../../Services/firebaseAuth";
import { Global } from "../../Utils/GlobalStyles";
import { Colors } from "../../Utils/ReUsables";
import { LoginStyles } from "./RegisterStyles";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setpasswordCon] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [passwordErrorCon, setpasswordErrorCon] = useState("");
  const [userNameError, setuserNameError] = useState("");

  const [Loading, setLoading] = useState(false);

  const Register = async () => {
    setLoading(true);

    console.log("Registering");
    if (email === "") {
      setemailError("Please enter your email");
      setLoading(false);
    }
    if (password === "") {
      setpasswordError("Please enter a password");
      setLoading(false);
    }
    if (passwordCon === "") {
      setpasswordErrorCon("Please confirm your password");
      setLoading(false);
    }
    if (userName == "") {
      setuserNameError("Please enter a user name");
      setLoading(false);
    }

    if (
      email !== "" &&
      password !== "" &&
      passwordCon !== "" &&
      userName !== ""
    ) {
      if (passwordCon === password) {
        await RegisterNewUser(userName, email, password);
        setLoading(false);
      } else {
        setpasswordErrorCon("Passwords don't match");
      }
    }
  };

  return (
    <ScrollView style={LoginStyles.Container}>
      <Loader loading={Loading} position={"abso"} />
      <ImageBackground
        style={LoginStyles.Image}
        source={require("../../assets/Backgrounds/Leaf_Background.png")}
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
            Join Today!
          </Text>
          <Text style={[Global.HeadingThree, LoginStyles.Headings]}>
            Sign Up to continue
          </Text>
        </View>

        <View style={LoginStyles.InputContainer}>
          <Input
            Place={"Username"}
            Type={"default"}
            Icon={userNameError === "" ? "User" : "UserRed"}
            SecureEntry={false}
            setProp={setUserName}
            Error={userNameError}
          />
          <Input
            Place={"Email"}
            Type={"email-address"}
            Icon={emailError === "" ? "Mail" : "MailRed"}
            SecureEntry={false}
            setProp={setEmail}
            Error={emailError}
          />
          <Input
            Place={"Password"}
            Type={"default"}
            Icon={passwordError === "" ? "Lock" : "LockRed"}
            SecureEntry={true}
            setProp={setPassword}
            Error={passwordError}
          />
          <KeyboardAvoidingView behavior="position" true>
            <Input
              Place={"Confirm Password"}
              Type={"default"}
              Icon={passwordError === "" ? "Lock" : "LockRed"}
              SecureEntry={true}
              setProp={setpasswordCon}
              Error={passwordErrorCon}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={{ marginTop: "20%" }}></View>

        <KeyboardAvoidingView behavior="position" true>
          <Button
            OnPress={Register}
            ButtonType={"Primary"}
            ButText={"Register"}
          />
        </KeyboardAvoidingView>

        <View
          style={{
            flexDirection: "row",
            padding: 10,
            marginTop: 35,
            justifyContent: "space-around",
          }}
        >
          <Text style={Global.CompetitionFont}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[LoginStyles.AccountBold, { color: Colors.Red }]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
