import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import EditCheckupAction from "./pages/EditCheckupAction.tsx";
import AllActions from "./pages/AllActions.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";
import AdminProtectedRoute from "./utils/AdminProtectedRoute.tsx";
import AdminBoard from "./pages/AdminBoard.tsx";
import {UserProvider} from "./utils/UserContext.tsx";
import EditUser from "./pages/EditUser.tsx";

export default function App() {


    return (
        <UserProvider>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path={"/checkup-actions"} element={<AllActions/>}></Route>
                    <Route path={"/checkup-actions/:id"} element={<EditCheckupAction/>}/>
                </Route>
                <Route element={<AdminProtectedRoute/>}>
                    <Route path={"/admin/board"} element={<AdminBoard/>}/>
                    <Route path={"/admin/editUser/:id"} element={<EditUser/>}/>
                </Route>

            </Routes>
        </UserProvider>
    )
}