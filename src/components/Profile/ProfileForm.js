import {useRef, useContext} from "react";
import {useHistory} from "react-router-dom";

import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDhuduV-Ni2sKveHIFBq1kR3R0z-0tQ7d8', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            //assume success
            history.replace('/');
        });
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
