import {useState} from "react";
import ManageUsers from "../components/adminComponents/user/ManageUsers";
import ManageTitles from "../components/adminComponents/title/ManageTitles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {Button, ButtonGroup } from "@mui/material";

export default function AdminDashboard() {
    const [tab, setTab] = useState<"USERS" | "TITLES">("USERS");

    return (
        <Box sx={{height: "100%", width: "100%", padding: "10px"}}>
            <Typography color={"textPrimary"} variant="h5" component="h2" sx={{margin: 1}}>
                Admin Dashboard
            </Typography>
            <Divider/>
            <Box sx={{marginBottom: 1}}>
                <ButtonGroup variant={"contained"} size="small" sx={{gap: "1px"}}>
                    <Button onClick={() => setTab("USERS")}>Manage users</Button>
                    <Button onClick={() => setTab("TITLES")}>Manage titles</Button>
                </ButtonGroup>
            </Box>

            {tab === "USERS" && <ManageUsers/>}
            {tab === "TITLES" && <ManageTitles/>}
        </Box>
    );
}
