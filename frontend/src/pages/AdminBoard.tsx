import {useEffect, useState} from "react";
import {AppUser} from "../models/AppUser.ts";
import axios from "axios";
import UserCard from "../components/UserCard.tsx";
import {NavLink} from "react-router-dom";

function AdminBoard() {
    const [users, setUsers] = useState<AppUser[]>()

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = () => {
        axios.get("/api/users")
            .then(r => {
                console.log("Fetched users:", r.data)
                setUsers(r.data)})
            .catch(e => console.log("Error fetching users", e))
    }

    if (!users) {
        return "Loading..."
    }

    return (
        <div>
            <p>Admin Board</p>
            {
                users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))
            }
            <NavLink to={"/"}>Home</NavLink>
        </div>
    );
}


export default AdminBoard;