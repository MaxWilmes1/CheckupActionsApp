import axios from "axios";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export default function Header() {
    const [userName, setUserName] = useState<string | null>(null)

    function gitHubOauthLogin() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(r => {setUserName(r.data)})
            .catch(() => setUserName(null))
    }, [])

    return (
        <div>
            <h1>Checkup Actions App</h1>
            {userName && <p>Logged in as: {userName}</p>}
            {!userName
                ? <button onClick={gitHubOauthLogin}>GitHub Oauth login</button>
                : <button onClick={logout}>Logout</button>
            }
            {userName && <NavLink to={"/checkup-actions"}>View all Checkup Actions</NavLink>}
        </div>
    );
}