import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const Firebase = createContext(null);

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const useFirebase = () => useContext(Firebase);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// enable firebase analytics
const analytics = getAnalytics(firebaseApp);

// enable firebase appCheck
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),

  isTokenAutoRefreshEnabled: true
});

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const signUpUserWithEmailAndPassword = async (
    email,
    password,
    displayName,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      if (userCredential && userCredential.user) {
        const user = userCredential.user;
        await updateProfile(user, { displayName });
        console.log("Successfully Signed up!");
      } else {
        throw new Error("User credential is undefined");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const signInUserWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error) {
      setError(error.message);
    }
  };
  const signInUserWithGithub = async () => {
    try {
      await signInWithPopup(firebaseAuth, githubProvider);
    } catch (error) {
      setError(error.message);
    }
  };
  const signInUserWithTwitter = async () => {
    try {
      await signInWithPopup(firebaseAuth, twitterProvider);
    } catch (error) {
      setError(error.message);
    }
  };
  const signInUserWithFacebook = async () => {
    try {
      await signInWithPopup(firebaseAuth, facebookProvider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateNewListing = async (listingData) => {
    try {
      const { coverPic, ...rest } = listingData;
      // Upload cover image to Firebase Storage
      const imgRef = ref(
        storage,
        `uploads/images/${Date.now()}-${coverPic.name}`,
      );
      const uploadResult = await uploadBytes(imgRef, coverPic);

      // Add book listing to Firestore
      await addDoc(collection(firestore, "books"), {
        ...rest,
        imageURL: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      console.log("Listing created successfully");
    } catch (error) {
      console.error("Error creating listing:", error);
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("Sign out successfully");
    } catch (error) {
      console.error("Sign out error: ", error.message);
    }
  };

  const handleUserProfileUpdate = async ({ details }) => {
    try {
      if (!firebaseAuth.currentUser) {
        throw new Error("No authenticated user");
      }
      await updateProfile(firebaseAuth.currentUser, { ...details });
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const getListAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const isLoggedIn = !!user;

  return (
    <Firebase.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signInUserWithGoogle,
        signInUserWithGithub,
        signInUserWithFacebook,
        signInUserWithTwitter,
        isLoggedIn,
        handleCreateNewListing,
        handleSignOut,
        user,
        error,
        getListAllBooks,
        getImageUrl,
        handleUserProfileUpdate,
      }}
    >
      {props.children}
    </Firebase.Provider>
  );
};

export default FirebaseProvider;
