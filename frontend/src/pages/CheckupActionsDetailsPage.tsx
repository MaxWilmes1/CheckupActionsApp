import {useNavigate, useParams} from "react-router-dom";
import {SelectChangeEvent, Box} from "@mui/material";
import {useCheckupAction} from "../utils/customHooks/useCheckupAction.ts";
import {useManagedData} from "../utils/customHooks/useManagedData.ts";
import CheckupActionForm from "../components/checkupAction/form/CheckupActionForm.tsx";
import axios from "axios";
import {ChangeEvent, FormEvent} from "react";
import CheckupActionsDetailsHeader from "../components/checkupAction/CheckupActionsDetailsHeader.tsx";

export default function CheckupActionsDetailsPage() {
    const params = useParams();
    const {action, setAction} = useCheckupAction(params.id);
    const navigate = useNavigate();
    const managedData = useManagedData();

    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setAction(prevAction => {
            if (!prevAction) return null;
            return {...prevAction, [name]: value};
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action) {
            axios.put(`/api/checkup-actions/${params.id}`, action)
                .then(() => navigate("/checkup-actions"));
        }
    };

    if (!action || !managedData) {
        return "Loading...";
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 2, paddingRight: 0}}>
            <CheckupActionsDetailsHeader action={action}/>
            <CheckupActionForm
                action={action}
                managedData={managedData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}
