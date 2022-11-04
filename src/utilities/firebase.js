import {
  GoogleAuthProvider,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  connectDatabaseEmulator,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";
import { useCallback, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

``;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA6GTLxfMgAvka3wLp-pzx2xB8P7E3DHE",
  authDomain: "react-tutorial-siwoopark10-1.firebaseapp.com",
  databaseURL:
    "https://react-tutorial-siwoopark10-1-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-siwoopark10-1",
  storageBucket: "react-tutorial-siwoopark10-1.appspot.com",
  messagingSenderId: "1065036134425",
  appId: "1:1065036134425:web:724204bf9c05e46c6e1288",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser));

  return [user];
};

if (process.env.REACT_APP_EMULATE) {
  const testFirebase = initializeApp(firebaseConfig);
  const testDB = getDatabase(testFirebase);
  const testAuth = getAuth(testFirebase);

  connectAuthEmulator(testAuth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(testDB, "127.0.0.1", 9000);

  signInWithCredential(
    testAuth,
    GoogleAuthProvider.credential(
      '{"sub": "yn1v9ObY5KbWQ4x7D0AhVjkaiiwV", "email": "test@gmail.com", "displayName":"Test User", "email_verified": true}'
    )
  );
}
