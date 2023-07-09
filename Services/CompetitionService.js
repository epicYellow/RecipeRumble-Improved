import firebase from "firebase/app";
import "firebase/firestore";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Utils/Firebase";

export const createCompetition = async (competition) => {
  try {
    const docRef = await addDoc(collection(db, "competitions"), competition);
    console.log("Added Competition " + docRef.id);
    if (docRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("competition not added: " + error);
  }
};

export const createSubmission = async (submission, user) => {
  try {
    const docRef = await addDoc(collection(db, "submissions"), submission);
    const userRef = (db, "users", user.id);
    await updateDoc(userRef, {
      PrevSubmissions: firebase.firestore.arrayUnion(docRef.id),
    });
    console.log("Added Submission " + userRef);
    if (docRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("user not added: " + error);
  }
};

export const getAllCompetitions = async () => {
  try {
    var Competitions = [];
    const snapshot = await getDocs(collection(db, "competitions"));

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());

      Competitions.push({ ...doc.data(), CompId: doc.id });
    });

    return Competitions;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSubmissionsById = async (id) => {
  try {
    var Competitions = [];
    const snapshot = await getDocs(collection(db, "submissions"));

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data().CompetitionId);
      if (id === doc.data().CompetitionId) {
        Competitions.push({ ...doc.data(), SubID: doc.id });
      }
    });

    return Competitions;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSubmissionsByUserId = async (id) => {
  try {
    var Competitions = [];
    const snapshot = await getDocs(collection(db, "submissions"));
    console.log("SNAP");
    console.log(snapshot);

    snapshot.forEach((doc) => {
      console.log("GROOT" + doc.data().Userid, "=>", id);
      if (id === doc.data().Userid) {
        Competitions.push({ ...doc.data(), SubID: doc.id });
      }
    });

    return Competitions;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateLike = async (
  id,
  Image,
  SubName,
  Description,
  Ingredients,
  Userid,
  CompetitionId,
  Likes
) => {
  try {
    await updateDoc(doc(db, "submissions", id), {
      CompetitionId,
      Description,
      Image,
      Ingredients,
      Likes,
      SubName,
      Userid,
    });
    console.log("Voted");
  } catch (error) {
    console.log(error);
  }
};
