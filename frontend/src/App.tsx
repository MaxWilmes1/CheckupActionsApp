import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CheckupActionsDetailsPage from "./pages/CheckupActionsDetailsPage.tsx";
import CheckupActionsDashboard from "./pages/CheckupActionsDashboard.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";
import AdminProtectedRoute from "./utils/AdminProtectedRoute.tsx";
import {UserProvider} from "./utils/UserContext.tsx";
import EditUser from "./components/adminComponents/user/EditUser.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

export default function App() {


    return (
        <UserProvider>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path={"/checkup-actions"} element={<CheckupActionsDashboard/>}></Route>
                    <Route path={"/checkup-actions/:id"} element={<CheckupActionsDetailsPage/>}/>
                </Route>
                <Route element={<AdminProtectedRoute/>}>
                    <Route path={"/admin/board"} element={<AdminDashboard/>}/>
                    <Route path={"/admin/editUser/:id"} element={<EditUser/>}/>
                </Route>

            </Routes>
        </UserProvider>
    )
}