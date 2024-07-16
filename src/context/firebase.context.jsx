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
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const FirebaseContext = createContext(null);

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

export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Enable Firebase analytics
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(firebaseApp);

// Enable Firebase AppCheck
// eslint-disable-next-line no-unused-vars
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user || null);
      setLoading(false);
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
      const { bookCoverPicture, bookOtherPictures, ...rest } = listingData;

      // Upload cover image to Firebase Storage
      const coverImgRef = ref(
        storage,
        `uploads/images/${Date.now()}-${bookCoverPicture.name}`,
      );
      await uploadBytes(coverImgRef, bookCoverPicture);
      const coverImgURL = await getDownloadURL(coverImgRef);

      // Upload book pictures to Firebase Storage
      const uploadTasks = bookOtherPictures.map(async (file) => {
        const imgRef = ref(
          storage,
          `uploads/images/${Date.now()}-${file.name}`,
        );
        await uploadBytes(imgRef, file);
        return getDownloadURL(imgRef);
      });
      const imageURLs = await Promise.all(uploadTasks);

      // Add book listing to Firestore
      const docRef = await addDoc(collection(firestore, "books"), {
        ...rest,
        imageURLs,
        coverImgURL,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      // Get the newly created document ID
      const bookDocumentID = docRef.id;

      const date = new Date();
      const formattedDate = date
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/,/, "");

      // Add user listing reference to Firestore
      await addDoc(collection(firestore, `users/${user.uid}/booksCreated`), {
        bookDocumentID,
        createdAt: formattedDate,
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

  let lastVisible = null;

  const resetPagination = () => {
    lastVisible = null;
  };

  const getListBooks = async (limitCount = 12, nextPage = true) => {
    const docsRef = collection(firestore, "books");

    let booksQuery;

    if (nextPage && lastVisible) {
      booksQuery = query(docsRef, startAfter(lastVisible), limit(limitCount));
    } else {
      booksQuery = query(docsRef, limit(limitCount));
    }
    try {
      const querySnapshot = await getDocs(booksQuery);

      if (querySnapshot.docs.length > 0) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      }

      return querySnapshot;
    } catch (error) {
      console.error("Error getting list books:", error.message);
    }
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    return await getDoc(docRef);
  };

  const placeOrder = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    console.log(result);
  };

  const fetchMyProducts = async () => {
    if (!user) return null;
    try {
      const booksCreatedRef = collection(
        firestore,
        `users/${user.uid}/booksCreated`,
      );
      const booksCreatedSnapshot = await getDocs(booksCreatedRef);
      if (booksCreatedSnapshot.empty) {
        console.log("No books created by this user.");
        return [];
      }

      const booksCreated = booksCreatedSnapshot.docs.map((doc) => doc.data());

      const bookDetailsPromises = booksCreated.map(async (book) => {
        const bookDocRef = doc(firestore, "books", book.bookDocumentID);
        const bookDocSnapshot = await getDoc(bookDocRef);
        if (!bookDocSnapshot.exists()) {
          console.log(`Book with ID ${book.bookDocumentID} does not exist.`);
          return null;
        }

        const ordersCollectionRef = collection(
          firestore,
          "books",
          book.bookDocumentID,
          "orders",
        );

        const ordersQuerySnapshot = await getDocs(ordersCollectionRef);

        const orderCount = ordersQuerySnapshot.size;
        console.log(orderCount);

        return {
          id: book.bookDocumentID,
          createdAt: book.createdAt,
          totalOrders: orderCount,
          ...bookDocSnapshot.data(),
        };
      });

      const bookDetails = await Promise.all(bookDetailsPromises);
      return bookDetails.filter((book) => book !== null);
    } catch (error) {
      console.error("Error fetching user's products:", error.message);
      return [];
    }
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
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
        loading,
        error,
        getListBooks,
        getBookById,
        getImageUrl,
        handleUserProfileUpdate,
        placeOrder,
        fetchMyProducts,
        resetPagination,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
