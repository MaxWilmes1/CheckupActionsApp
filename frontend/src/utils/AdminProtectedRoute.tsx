import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "./UserContext.tsx";

export default function AdminProtectedRoute() {
    const {user} = useUser()
    return user && user.role === "ADMIN" ? <Outlet/> : <Navigate to={"/"}/>
}