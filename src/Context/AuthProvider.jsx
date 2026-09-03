import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.init";

export const AuthContext = createContext(null);

// ─── DEV BYPASS ────────────────────────────────────────────────────────────────
// Set to true to skip Firebase authentication during development.
// All PrivateRoutes will pass and you'll appear as a logged-in mock user.
// Set back to false (or remove) before deploying to production.
const DEV_BYPASS_AUTH = true;

const MOCK_USER = {
  uid: "dev-user-001",
  email: "dev@paymenttrack.app",
  displayName: "Zabed (Dev)",
  photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  emailVerified: true,
  role: "admin",
};
// ───────────────────────────────────────────────────────────────────────────────

let auth = null;
if (app) {
  try {
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase Auth getAuth warning:", error);
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEV_BYPASS_AUTH ? MOCK_USER : null);
  const [loading, setLoading] = useState(!DEV_BYPASS_AUTH);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.reject(
        new Error("Firebase Auth is not configured. Please check your .env.local file.")
      );
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.reject(
        new Error("Firebase Auth is not configured. Please check your .env.local file.")
      );
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.reject(
        new Error("Firebase Auth is not configured. Please check your .env.local file.")
      );
    }
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubSignIn = () => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.reject(
        new Error("Firebase Auth is not configured. Please check your .env.local file.")
      );
    }
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setLoading(false);
    if (DEV_BYPASS_AUTH) {
      setUser(MOCK_USER);
      return Promise.resolve();
    }
    if (!auth) {
      setUser(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    if (!auth || !auth.currentUser) {
      return Promise.reject(
        new Error("No logged in user or Firebase auth not initialized.")
      );
    }
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    // Skip real Firebase listener in dev bypass mode
    if (DEV_BYPASS_AUTH) return;

    if (!auth) {
      setUser(null);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.warn("Auth state change error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    googleSignIn,
    gitHubSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
