import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

  isTokenAutoRefreshEnabled: true,
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
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUserWithGoogle = async () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };
  const signInUserWithGithub = async () => {
    signInWithPopup(firebaseAuth, githubProvider);
  };
  const signInUserWithTwitter = async () => {
    signInWithPopup(firebaseAuth, twitterProvider);
  };
  const signInUserWithFacebook = async () => {
    signInWithPopup(firebaseAuth, facebookProvider);
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

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    return await getDoc(docRef);
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
        getBookById,
        getImageUrl,
        handleUserProfileUpdate,
      }}
    >
      {props.children}
    </Firebase.Provider>
  );
};

export default FirebaseProvider;
