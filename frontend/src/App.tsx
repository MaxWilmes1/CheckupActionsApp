import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CheckupActionsDetailsPage from "./pages/CheckupActionsDetailsPage.tsx";
import CheckupActionsDashboard from "./pages/CheckupActionsDashboard.tsx";
import ProtectedRoutes from "./utils/protectedRoutes/ProtectedRoutes.tsx";
import AdminProtectedRoute from "./utils/protectedRoutes/AdminProtectedRoute.tsx";
import {UserProvider} from "./utils/components/UserContext.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import Header from "./components/nav/Header.tsx";
import NewCheckupActionPage from "./pages/NewCheckupActionPage.tsx";

export default function App() {

    return (
        <UserProvider>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path={"/checkup-actions"} element={<CheckupActionsDashboard/>}></Route>
                    <Route path={"/checkup-actions/:id"} element={<CheckupActionsDetailsPage/>}/>
                    <Route path={"/checkup-actions/add"} element={<NewCheckupActionPage/>}/>
                </Route>
                <Route element={<AdminProtectedRoute/>}>
                    <Route path={"/admin/board"} element={<AdminDashboard/>}/>
                </Route>
            </Routes>
        </UserProvider>
    )
}