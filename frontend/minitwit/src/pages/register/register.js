import React, {useState} from "react";

export default function Register() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [passMatch, setPassMatch] = useState(false);

    function checkPassword(e) {
        setPasswordCheck(e.target.value);

        if (password === passwordCheck) {
            console.log("Passwords match");

        } else if (passwordCheck.length > 0) {
                console.log("Passwords does not match");
                setPassMatch(true);
        }
    }

    return(
        <div className="register-container">
            <h2>Sign up</h2>
            <form action="" method='post'>
                <dl>
                    Username:
                    <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
                    E-mail:
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
                    Password:
                    <input className="login-input-password" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>
                    Password <small>(repeat)</small>:
                    <input className="login-input-password" type='password' name='passwordCheck' value={passwordCheck} onChange={(e) => checkPassword(e)}/>
                    {passMatch && <p>Passwords does not match</p>}
                </dl>
                <div className="actions"/><input type="submit" value="Sign In"/>
            </form>
        </div>
    );
} 