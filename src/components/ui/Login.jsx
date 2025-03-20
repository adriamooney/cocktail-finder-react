// Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/init';

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // Handle successful sign-in (e.g., redirect or update UI)
    } catch (error) {
      console.error("Error signing in with Google", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};
export default Login;