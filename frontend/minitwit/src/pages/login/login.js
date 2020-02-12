import React, {useState} from 'react';
import '../../style.css';

export default function Login(){
    //Javascript logic
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    console.log(username);
    console.log(password);

    return(
        <div className="login-container">
            <h2>Sign In</h2>
            <form action="" method='post'>
                <dl>
                    Username:
                    <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
                    Password:
                    <input className="login-input-password" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </dl>
                <div className="actions"/><input type="submit" value="Sign In"/>
            </form>
        </div>
    );
}