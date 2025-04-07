import {useState} from "react";
import ManageUsers from "../components/adminComponents/user/ManageUsers";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {Button, ButtonGroup } from "@mui/material";
import {DataType} from "../models/data/DataType.ts";
import DataForm from "../components/adminComponents/data/DataForm.tsx";

export default function AdminDashboard() {
    const [tab, setTab] = useState<DataType | "USERS">("USERS");

    return (
        <Box sx={{height: "100%", width: "100%", padding: "10px"}}>
            <Typography color={"textPrimary"} variant="h5" component="h2" sx={{margin: 1}}>
                Admin Dashboard
            </Typography>
            <Divider/>
            <Box sx={{marginBottom: 1}}>
                <ButtonGroup variant={"contained"} size="small" sx={{gap: "1px"}}>
                    <Button onClick={() => setTab("USERS")}>users</Button>
                    <Button onClick={() => setTab("TITLE")}>titles</Button>
                    <Button onClick={() => setTab("SUBTITLE")}>sub-titles</Button>
                    <Button onClick={() => setTab("ART")}>ART</Button>
                    <Button onClick={() => setTab("ADU")}>ADU</Button>
                    <Button onClick={() => setTab("APPLICATION")}>Application</Button>
                    <Button onClick={() => setTab("CINUM")}>CINUM</Button>
                    <Button onClick={() => setTab("PI")}>PI</Button>
                </ButtonGroup>
            </Box>

            {tab === "USERS" && <ManageUsers/>}
            {tab === "TITLE" && <DataForm type={"TITLE"}/>}
            {tab === "SUBTITLE" && <DataForm type={"SUBTITLE"}/>}
            {tab === "ART" && <DataForm type={"ART"}/>}
            {tab === "ADU" && <DataForm type={"ADU"}/>}
            {tab === "APPLICATION" && <DataForm type={"APPLICATION"}/>}
            {tab === "CINUM" && <DataForm type={"CINUM"}/>}
            {tab === "PI" && <DataForm type={"PI"}/>}
        </Box>
    );
}
