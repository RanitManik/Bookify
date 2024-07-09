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
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

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
const analytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
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

  const handleCreateNewListing = async ({
    name,
    authorName,
    isbn10,
    isbn13,
    price,
    discount,
    coverPic,
    description,
    authorDescription,
    itemWeight,
    pages,
    language,
    countryOfOrigin,
  }) => {
    try {
      // Upload cover image to Firebase Storage
      const imgRef = ref(
        storage,
        `uploads/images/${Date.now()}-${coverPic.name}`,
      );
      const uploadResult = await uploadBytes(imgRef, coverPic);

      // Add book listing to Firestore
      await addDoc(collection(firestore, "books"), {
        name,
        authorName,
        isbn10,
        isbn13,
        price,
        discount,
        imageURL: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        description,
        authorDescription,
        itemWeight,
        pages,
        language,
        countryOfOrigin,
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
      }}
    >
      {props.children}
    </Firebase.Provider>
  );
};

export default FirebaseProvider;
