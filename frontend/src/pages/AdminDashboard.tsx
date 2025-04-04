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
        <Box>
            <Typography color={"textPrimary"} variant="h5" component="h2" sx={{margin: "10px"}}>
                Admin Dashboard
            </Typography>
            <Divider/>
            <Box>
                <ButtonGroup variant={"contained"} size="small" aria-label="Small button group" sx={{gap: "1px"}}>
                    <Button onClick={() => setTab("USERS")}>Manage users</Button>
                    <Button onClick={() => setTab("TITLES")}>Manage titles</Button>
                </ButtonGroup>
            </Box>

            {tab === "USERS" && <ManageUsers/>}
            {tab === "TITLES" && <ManageTitles/>}
        </Box>
    );
}
