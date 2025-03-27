import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CheckupActionDetails from "./pages/CheckupActionDetails.tsx";
import AllActionsView from "./pages/AllActionsView.tsx";

export default function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/checkup-actions"} element={<AllActionsView/>}></Route>
                <Route path={"/checkup-actions/:id"} element={<CheckupActionDetails/>}/>
            </Routes>
        </>
    )
}