import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CheckupActionDetails from "./pages/CheckupActionDetails.tsx";

export default function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/checkup-actions/:id"} element={<CheckupActionDetails/>}/>
            </Routes>
        </>
    )
}