
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from './firebase.config';


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = { name: displayName, email: email }
                setLoggedInUser(signedInUser);
                history.replace(from);
                //console.log(signedInUser);
            })
            .catch(error => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;