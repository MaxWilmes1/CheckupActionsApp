import {useNavigate} from "react-router-dom";
import {SelectChangeEvent, Box} from "@mui/material";
import {useCheckupAction} from "../utils/customHooks/useCheckupAction.ts";
import {useManagedData} from "../utils/customHooks/useManagedData.ts";
import CheckupActionForm from "../components/checkupAction/CheckupActionForm.tsx";
import axios from "axios";
import {ChangeEvent, FormEvent} from "react";

export default function NewCheckupActionPage() {
    const {action, setAction} = useCheckupAction();
    const navigate = useNavigate();
    const managedData = useManagedData();

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setAction(prevAction => {
            if (!prevAction) return null;
            return { ...prevAction, [name]: value };
        });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <Box sx={{backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column", padding: 2}}>
            <CheckupActionForm action={action}
                               managedData={managedData}
                               onSelectChange={handleSelectChange}
                               onInputChange={handleInputChange}
                               onSubmit={handleSubmit}
            />
        </Box>
    );
}
