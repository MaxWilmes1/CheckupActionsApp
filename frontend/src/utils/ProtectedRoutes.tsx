import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "./UserContext.tsx";

export default function ProtectedRoutes() {
    const {user} = useUser()

    return user ? <Outlet/> : <Navigate to={"/"}/>
}