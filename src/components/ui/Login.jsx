// Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase/init';
import Header from './Header'

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
    <div>
        <main>
            <section id="search">
            <div className="container">
                <div className="">
                    <Header title="Get a great cocktail idea" subtitle="It's happy hour somewhere" />
                    <div className="login__wrapper">
                        <h3 className="login__title">Sign in for free to view cocktails and save your favorites!</h3>
                        <button className="btn click btn--login" onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                   
                </div>
            </div>
            </section>
        </main>
    </div>
   
  );
};
export default Login;