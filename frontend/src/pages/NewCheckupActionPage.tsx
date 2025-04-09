import {useNavigate} from "react-router-dom";
import {SelectChangeEvent, Box, Typography} from "@mui/material";
import {useCheckupAction} from "../utils/customHooks/useCheckupAction.ts";
import {useManagedData} from "../utils/customHooks/useManagedData.ts";
import CheckupActionForm from "../components/checkupAction/form/CheckupActionForm.tsx";
import axios from "axios";
import {ChangeEvent, FormEvent} from "react";
import Divider from "@mui/material/Divider";

export default function NewCheckupActionPage() {
    const {action, setAction} = useCheckupAction();
    const navigate = useNavigate();
    const managedData = useManagedData();

    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setAction(prevAction => {
            if (!prevAction) return null;
            return { ...prevAction, [name]: value };
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action) {
            axios.post("/api/checkup-actions", action)
                .then(() => navigate("/checkup-actions"));
        }
    };

    if (action === null || !managedData) {
        return "Loading...";
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 2}}>
            <Typography variant="h6" component="h1" color="textPrimary" sx={{fontWeight: "bold"}}>
                Create new Checkup action
            </Typography>
            <Divider/>
            <CheckupActionForm action={action}
                               managedData={managedData}
                               onChange={handleChange}
                               onSubmit={handleSubmit}
            />
        </Box>
    );
}
