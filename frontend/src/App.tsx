import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CheckupActionDetails from "./pages/CheckupActionDetails.tsx";
import AllActionsView from "./pages/AllActionsView.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(() => {
                setIsLoggedIn(true)
            })
            .catch(error => {
                console.error("Failed loading the user", error)
                setIsLoggedIn(false)
            })
    }, [])

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
                    <Route path={"/checkup-actions"} element={<AllActionsView/>}></Route>
                    <Route path={"/checkup-actions/:id"} element={<CheckupActionDetails/>}/>
                </Route>

            </Routes>
        </>
    )
}