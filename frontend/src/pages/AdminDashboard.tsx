import {useState} from "react";
import ManageUsers from "../components/adminComponents/user/ManageUsers";
import ManageTitles from "../components/adminComponents/title/ManageTitles";
import {NavLink} from "react-router-dom";

export default function AdminDashboard() {
    const [tab, setTab] = useState<"USERS" | "TITLES">("USERS");

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <div>
                <button onClick={() => setTab("USERS")} className={tab === "USERS" ? "active" : ""}>
                    Manage Users
                </button>
                <button onClick={() => setTab("TITLES")} className={tab === "TITLES" ? "active" : ""}>
                    Manage Titles
                </button>
            </div>

            {tab === "USERS" && <ManageUsers />}
            {tab === "TITLES" && <ManageTitles />}
            <NavLink to={"/"}>Home</NavLink>
        </div>
    );
}
