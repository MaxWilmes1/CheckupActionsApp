import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {AppUser} from "../../../models/appUser/AppUser.ts";
import {AppUserRole} from "../../../models/appUser/AppUserRole.tsx";

export default function EditUser() {
    const params = useParams()
    const [user, setUser] = useState<AppUser>()
    const [selectedRole, setSelectedRole] = useState<AppUserRole>()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/api/users/${params.id}`)
            .then(r => {
                setUser(r.data)
                setSelectedRole(r.data.role)
            })
            .catch(error => console.error("Error loading user with id:" + params.id, error));
    }, []);

    const handleSave = ()=>{
        axios.put(`/api/users/${params.id}`, {...user, role:selectedRole})
            .then(() => alert("User role updated!"))
            .catch(e => console.error("Error updating user:", e))
            navigate("/admin/board")
    }

    return (
        <div>
            <p>{user?.username}</p>
            <p>{user?.id}</p>
            <label>Role:</label>
            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value as AppUserRole)}>
                <option value={"NONE"}>NONE</option>
                <option value={"USER"}>USER</option>
                <option value={"ADMIN"}>ADMIN</option>
            </select>
            <button onClick={handleSave}>Save</button>
            <NavLink to={"/admin/board"}>Admin Dashbaord </NavLink>
        </div>
    );
}