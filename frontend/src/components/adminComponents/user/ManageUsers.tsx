import {useEffect, useState} from "react";
import {AppUser} from "../../../models/appUser/AppUser.ts";
import axios from "axios";
import UserCard from "./UserCard.tsx";

export default function ManageUsers() {
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
            <h3>ManageUsers</h3>
            {
                users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </div>
    );
}