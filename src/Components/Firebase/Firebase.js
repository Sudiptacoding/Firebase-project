import React, { useState } from 'react';
import './Firebase.css';
// import
import { auth } from '../../firebase.config';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";




const provider = new GoogleAuthProvider();
// google sign in




const Firebase = () => {
    // toggol section
    const [newUser, setNewUser] = useState(false);

    // firebase data section
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        succes: false
    })





    const handelSignInClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const { photoURL, email, displayName } = result.user;
                setUser({
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                })
            }).catch((error) => {
                console.log(error);
            });
    }
    const handelSignOutClick = () => {
        signOut(auth).then(() => {
            setUser({
                isSignIn: false,
                name: '',
                email: '',
                password: '',
                photo: ''
            })
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    // input data
    const handelBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /^\S+@\S+\.\S/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFieldValid = /^.{4,}$/.test(e.target.value);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    // Submit Form
    const handelSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(() => {
                    const errorHandel = { ...user };
                    errorHandel.error = '';
                    errorHandel.succes = true;
                    setUser(errorHandel);
                    updedUserName(user.name);
                })
                .catch((error) => {
                    const errorHandel = { ...user };
                    errorHandel.error = error.message;
                    errorHandel.succes = false;
                    setUser(errorHandel);
                });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const errorHandel = { ...user };
                    errorHandel.error = '';
                    errorHandel.succes = true;
                    setUser(errorHandel);
                    console.log(res.user);
                })
                .catch((error) => {
                    const errorHandel = { ...user };
                    errorHandel.error = error.message;
                    errorHandel.succes = false;
                    setUser(errorHandel);
                });
        }
        e.preventDefault();
    }

    const updedUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            console.log("User name successfuly upded")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <h1>Plesase Enter Your Data</h1>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.succes &&
                <p style={{ color: 'green' }}>User {newUser ? 'create' : 'Logged in'} successfully</p>
            }
            {/* Google Sign */}
            <div>
                {
                    user.isSignIn ? <button onClick={handelSignOutClick}>Sign out</button> : <button onClick={handelSignInClick}>Sign in</button>
                }
            </div>
            {/* toggol */}
            <div>
                <button onClick={() => setNewUser(!newUser)}>
                    <span>{newUser ? "Log in form" : "sign in form"}</span>
                </button>
            </div>
            {/* form */}
            <form action="" onSubmit={handelSubmit}>
                {newUser && <input type="text" name="name" id="" onBlur={handelBlur} placeholder='Enter your name' />} <br />
                <input type="email" name="email" id="" onBlur={handelBlur} placeholder='Enter your email' /> <br />
                <input type="password" name="password" id="" onBlur={handelBlur} placeholder='Enter your password' /> <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>

                <div>
                    
                </div>
        </div>

    );
};

export default Firebase;