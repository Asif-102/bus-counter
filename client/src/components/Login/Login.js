import React from 'react';
import { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();

    const [isNewUser, setIsNewUser] = useState(true);
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

    const successLogin = (name, email) => {
        localStorage.setItem('userName', name);
        // localStorage.setItem('isAdmin', isAdmin);
        history.replace(from);
        history.go(0);
    }

    const errorLogin = (message) => {
        setErrorMessage(message);
    }

    const handleGoogleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                const token = result.credential.accessToken;
                const user = result.user;
                console.log(token, user);
                successLogin(user.displayName, user.email);
            })
            .catch(function (error) {
                const errorMessage = error.message;
                errorLogin(errorMessage);
            });
    }

    const handleGithubLogin = () => {
        firebase.auth().signInWithPopup(githubProvider)
            .then((result) => {
                const user = result.user;
                successLogin(user.email, user.email);
            }).catch((error) => {
                const errorMessage = error.message;
                errorLogin(errorMessage);
            });
    }

    const handleCreateAccount = (event) => {
        if (user.email && user.password && user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // setSignedInUser(user);
                    const name = user.firstName + ' ' + user.lastName;
                    const newUser = { ...user };
                    newUser.displayName = name;
                    // setSignedInUser(newUser);
                    updateUserProfile(name);
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }
        else {
            setErrorMessage("Password & Confirm Password don't match")
        }
        event.preventDefault();
    }

    const updateUserProfile = (name) => {
        const newUser = firebase.auth().currentUser;
        newUser.updateProfile({
            displayName: name,
        })
            .then(function () {
                successLogin(name, newUser.email);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const handleLogin = (event) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.displayName = res.user.displayName;
                setUser(newUserInfo);
                // setSignedInUser(newUserInfo);
                successLogin(newUserInfo.displayName, newUserInfo.email);
            })
            .catch(function (error) {
                setErrorMessage(error.message);
            });
        event.preventDefault();
    }

    return (
        <div className="login-container text-center mt-5">
            <div>
                {isNewUser ? <h1>Create an account</h1> : <h1>Login</h1>}
                <br />
                <form>
                    {isNewUser && <div className="form-group">
                        <input onBlur={handleBlur} name="firstName" type="text" className="form-control" placeholder="First Name" required />
                    </div>}

                    {isNewUser && <div className="form-group">
                        <input onBlur={handleBlur} name="lastName" type="text" className="form-control" placeholder="Last Name" required />
                    </div>}

                    <div className="form-group">
                        <input onBlur={handleBlur} name="email" type="email" className="form-control" placeholder="Email" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="password" type="password" className="form-control" placeholder="Password" required />
                    </div>

                    {isNewUser && <div className="form-group">
                        <input onBlur={handleBlur} name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" required />
                    </div>}

                    {isNewUser ? <button onClick={handleCreateAccount} type="submit" style={{ width: '100%' }} className="custom-btn">Sign Up</button>
                        : <button onClick={handleLogin} type="submit" style={{ width: '100%' }} className="custom-btn">Login</button>}
                </form>
                <br />
                {isNewUser ? <p>Already have an account? <b onClick={() => setIsNewUser(!isNewUser)} style={{ cursor: 'pointer', color: '#275A53' }}>Login here</b></p>
                    : <p>Don't have an account? <b onClick={() => setIsNewUser(!isNewUser)} style={{ cursor: 'pointer', color: '#275A53' }}>Register here</b></p>}

            </div>
            <h3 className="text-danger">{errorMessage}</h3>
            <br />
            <div className="d-flex justify-content-center">
                <button className="login-btn text-left" onClick={handleGoogleLogin}>
                    <img width="30px" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google icon" />
                    <b className="pr-5">Continue with Google</b>
                </button><br />
            </div>

            <div className="d-flex justify-content-center mb-5">
                <button className="login-btn text-left" onClick={handleGithubLogin}>
                    <img src="https://img.icons8.com/fluent/32/000000/github.png" alt="github icon" />
                    <b className="pr-5">Continue with Github</b>
                </button>
            </div>
            
        </div>
    );
};

export default Login;