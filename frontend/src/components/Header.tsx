import {NavLink} from "react-router-dom";
import {useUser} from "../utils/UserContext.tsx";
import AdminOnly from "../utils/AdminOnly.tsx";

export default function Header() {
    const {user} = useUser();

    function gitHubOauthLogin() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    return (
        <div>
            <h1>Checkup Actions App</h1>
            {user?.username && <p>Logged in as: {user.username}</p>}
            {user?.role && <p>Role: {user.role}</p>}
            {!user
                ? <button onClick={gitHubOauthLogin}>GitHub Oauth login</button>
                : <button onClick={logout}>Logout</button>
            }
            {user && <NavLink to={"/checkup-actions"}>Checkup Actions Dashboard</NavLink>}
            <AdminOnly>
                <NavLink to={"/admin/board"}>Admin Dashboard</NavLink>
            </AdminOnly>
        </div>
    );
}