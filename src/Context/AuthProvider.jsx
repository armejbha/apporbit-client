import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import useThemeMode from '../Hooks/useThemeMode';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import toast from 'react-hot-toast';

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const {theme,toggleTheme}=useThemeMode();
    const [loading, setLoading] = useState(true);
    const googleProvider=new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = async (newName, newPhotoURL) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: newName,
      photoURL: newPhotoURL,
    });

    await auth.currentUser.reload();

    setUser(auth.currentUser);  // Update your React Context or state

    toast.success("Profile updated!");
  } catch (error) {
    toast.error("Update failed: " + error.message);
  }
};

  

  // onAuthStateChange
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setLoading(false)
    setUser(currentUser);
  });
  return () => unsubscribe();
}, []);

const refreshUser = async () => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    setUser(auth.currentUser);
  }
};

  const authInfo = {
    refreshUser,
    user,
    setUser,
    loading,
    theme,
    toggleTheme,
    setLoading,
    createUser,
    logIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;