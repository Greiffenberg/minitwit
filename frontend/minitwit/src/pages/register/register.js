import React, {useState} from "react";
import '../../style.css';

export default function Register() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);

    function submitForm(e) {
        e.preventDefault();
        if (password === passwordCheck && !!password) {
            console.log('Calling API')
        } else {
            console.log('Passwords did not match')
        }
    }

    return(
        <div className="register-container">
            <h2>Sign up</h2>
            <form action="" method='POST' onSubmit={(e) => submitForm(e)}>
                <dl>
                    Username:
                    <input className="register-input-username" type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
                    E-mail:
                    <input className="register-input-email" type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
                    Password:
                    <input className="register-input-password" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>
                    Password <small>(repeat)</small>:
                    <input className="register-input-password-repeat" type='password' name='passwordCheck' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/> <br/>
                </dl>
                <div className="actions"/><input type="submit" value="Sign Up"/>
            </form>
        </div>
    );
} 