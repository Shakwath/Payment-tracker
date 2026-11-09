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
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../Firebase/Firebase.init";

export const AuthContext = createContext(null);

const EMAIL_ROLES_STORAGE_KEY = "mpt_email_roles_v1";
const PRIMARY_ADMIN_KEY = "mpt_primary_admin_email";

const DEFAULT_EMAIL_ROLES = [
  {
    email: "admin@markajulilm.edu.bd",
    role: "admin",
    name: "মাওলানা জাবেদ (মুহতামিম / অ্যাডমিন)",
    linkedId: "adm-01",
    updatedAt: "2026-10-01",
  },
  {
    email: "karim.guardian@gmail.com",
    role: "guardian",
    name: "আলহাজ্ব আব্দুল করিম (অভিভাবক)",
    linkedId: "grd-01",
    updatedAt: "2026-10-01",
  },
  {
    email: "mahmud.ali@gmail.com",
    role: "guardian",
    name: "মাওলানা মাহমুদ আলী (অভিভাবক)",
    linkedId: "grd-02",
    updatedAt: "2026-10-01",
  },
  {
    email: "rafiqul.islam@gmail.com",
    role: "guardian",
    name: "মোঃ রফিকুল ইসলাম (অভিভাবক)",
    linkedId: "grd-03",
    updatedAt: "2026-10-01",
  },
  {
    email: "tariqul.islam@markajulilm.edu.bd",
    role: "teacher",
    name: "মুফতি তারিকুল ইসলাম (উস্তাদ)",
    linkedId: "tch-01",
    updatedAt: "2026-10-01",
  },
  {
    email: "saiful.amin@markajulilm.edu.bd",
    role: "teacher",
    name: "হাফেজ ক্বারী সাইফুল আমিন (উস্তাদ)",
    linkedId: "tch-02",
    updatedAt: "2026-10-01",
  },
  {
    email: "habibullah@markajulilm.edu.bd",
    role: "teacher",
    name: "মাওলানা হাবিবুল্লাহ মিসবাহ (উস্তাদ)",
    linkedId: "tch-03",
    updatedAt: "2026-10-01",
  },
];

const ROLE_PROFILES = {
  admin: {
    role: "admin",
    badgeLabel: "মুহতামিম / অ্যাডমিন",
    badgeLabelEn: "Muhtamim / Admin",
  },
  guardian: {
    role: "guardian",
    badgeLabel: "অভিভাবক পোর্টাল",
    badgeLabelEn: "Guardian Portal",
  },
  teacher: {
    role: "teacher",
    badgeLabel: "উস্তাদ / শিক্ষক পোর্টাল",
    badgeLabelEn: "Teacher Portal",
  },
};

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [emailRoles, setEmailRoles] = useState(() => {
    try {
      const raw = localStorage.getItem(EMAIL_ROLES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_EMAIL_ROLES;
    } catch {
      return DEFAULT_EMAIL_ROLES;
    }
  });

  const [user, setUser] = useState(null);
  const [role, setRoleState] = useState("guardian");
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    try {
      localStorage.setItem(EMAIL_ROLES_STORAGE_KEY, JSON.stringify(emailRoles));
    } catch {}
  }, [emailRoles]);

  // Resolve a user's role strictly from their Firebase email and Admin's email-role directory
  const resolveRoleForEmail = (rawEmail, displayName = "") => {
    if (!rawEmail) return "guardian";
    const normalizedEmail = rawEmail.trim().toLowerCase();

    const existing = emailRoles.find(
      (item) => item.email.trim().toLowerCase() === normalizedEmail
    );
    if (existing) {
      return existing.role;
    }

    // If no primary real admin email has been registered yet, make the first real logged-in Firebase user Admin
    // so the system owner can manage roles for all other emails
    const primaryAdmin = localStorage.getItem(PRIMARY_ADMIN_KEY);
    const assignedRole = !primaryAdmin ? "admin" : "guardian";
    if (!primaryAdmin) {
      localStorage.setItem(PRIMARY_ADMIN_KEY, normalizedEmail);
    }

    const newEntry = {
      email: normalizedEmail,
      role: assignedRole,
      name: displayName || normalizedEmail.split("@")[0],
      linkedId: assignedRole === "guardian" ? "grd-01" : assignedRole === "teacher" ? "tch-01" : "adm-01",
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setEmailRoles((prev) => {
      if (prev.some((i) => i.email.trim().toLowerCase() === normalizedEmail)) return prev;
      return [newEntry, ...prev];
    });

    return assignedRole;
  };

  // Admin function: Assign or update role for any email (Guardian / Teacher / Admin)
  const assignEmailRole = ({ email, role: targetRole, name = "", linkedId = "" }) => {
    if (!email) return;
    const normalizedEmail = email.trim().toLowerCase();
    const cleanRole = ["admin", "guardian", "teacher"].includes(targetRole)
      ? targetRole
      : "guardian";

    setEmailRoles((prev) => {
      const exists = prev.some((i) => i.email.trim().toLowerCase() === normalizedEmail);
      if (exists) {
        return prev.map((item) =>
          item.email.trim().toLowerCase() === normalizedEmail
            ? {
                ...item,
                role: cleanRole,
                name: name || item.name,
                linkedId: linkedId || item.linkedId,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : item
        );
      }
      return [
        {
          email: normalizedEmail,
          role: cleanRole,
          name: name || normalizedEmail.split("@")[0],
          linkedId:
            linkedId ||
            (cleanRole === "guardian" ? "grd-01" : cleanRole === "teacher" ? "tch-01" : "adm-01"),
          updatedAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ];
    });

    // If the currently logged-in user's own email was updated, sync active role immediately
    if (user?.email && user.email.trim().toLowerCase() === normalizedEmail) {
      setRoleState(cleanRole);
      setUser((prev) => (prev ? { ...prev, role: cleanRole } : null));
    }
  };

  const removeEmailRole = (email) => {
    if (!email) return;
    const normalizedEmail = email.trim().toLowerCase();
    setEmailRoles((prev) =>
      prev.filter((item) => item.email.trim().toLowerCase() !== normalizedEmail)
    );
  };

  // Allow Admin to switch view or update role state
  const setRole = (newRole) => {
    const normalized = (newRole || "guardian").toLowerCase();
    setRoleState(normalized);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth).finally(() => {
      setUser(null);
      setLoading(false);
    });
  };

  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return Promise.resolve();
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    }).then(() => {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              displayName: name,
              photoURL: photoURL,
            }
          : null
      );
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          const matchedRole = resolveRoleForEmail(
            currentUser.email,
            currentUser.displayName
          );
          setRoleState(matchedRole);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName:
              currentUser.displayName ||
              currentUser.email?.split("@")[0] ||
              "Madrasa User",
            photoURL: currentUser.photoURL || "/logo.png",
            emailVerified: currentUser.emailVerified,
            role: matchedRole,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firebase onAuthStateChanged error:", err);
        setUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [emailRoles]);

  const activeRoleProfile = ROLE_PROFILES[role] || ROLE_PROFILES.guardian;

  const authInfo = {
    user,
    setUser,
    role,
    setRole,
    emailRoles,
    assignEmailRole,
    removeEmailRole,
    resolveRoleForEmail,
    ROLE_PROFILES,
    activeRoleProfile,
    loading,
    createUser,
    signIn,
    googleSignIn,
    gitHubSignIn,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
