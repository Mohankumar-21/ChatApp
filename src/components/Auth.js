import React from 'react';
import img from '../img/img.png';
import '../styles/Auth.css';
import { auth, provider } from '../firebase-config.js';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set('auth-token', result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.log('Popup closed by user');
      } else {
        console.error(err);
      }
    }
  };
  

  return (
    <div className='container1'>
      <div className="auth">
        <p className='welcome'>Welcome To Chat App</p>
        <img className='imgn' src={img} alt="Chat App Logo" />
        <p className='Sign'>Sign In With Google To Continue</p>
        <button className="auth-button" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};
