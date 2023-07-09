import { useNavigationBuilder } from "@react-navigation/native";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../Utils/Firebase";
import { createUserDB } from "./UserService";

export const LogInFun = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Alert.alert("Logged In", "You can continue to the app", [
      //   {
      //     text: "Continue",
      //     onPress: () => {},
      //   },
      // ]);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorMessage);
      Alert.alert(
        "Email or Password is incorrect",
        "Make sure you entered the correct details",
        [{ text: "Back", onPress: () => {} }]
      );
    });
};

export const RegisterNewUser = async (username, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        await createUserDB(username, email, user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
        Alert.alert("Error ", errorMessage, [
          { text: "Okay", onPress: () => {} },
        ]);
      });

    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: "https://i.ytimg.com/vi/g744_sUBsgo/maxresdefault.jpg",
    })
      .then((feedback) => {
        console.log(feedback);
        // LogInFun(email, password);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = () => {
  signOut(auth)
    .then(() => {})
    .catch((err) => {
      console.log(err.errorMessage);
    });
};

export const GetCurrentUser = () => {
  return auth.currentUser;
};

const updateAuthProfile = (username) => {};
