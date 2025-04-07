import {useNavigate, useParams} from "react-router-dom";
import {SelectChangeEvent, Box, Typography, Divider} from "@mui/material";
import {useCheckupAction} from "../utils/customHooks/useCheckupAction.ts";
import {useData} from "../utils/customHooks/useData.ts";
import CheckupActionForm from "../components/checkupAction/CheckupActionForm.tsx";
import axios from "axios";

export default function CheckupActionsDetailsPage() {
    const params = useParams();
    const {action, setAction} = useCheckupAction(params.id);
    const navigate = useNavigate();
    const data = useData();

    const handleChange = (event: SelectChangeEvent) => {
        setAction(prevAction => prevAction ? {...prevAction, title: event.target.value} : null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action) {
            axios.put(`/api/checkup-actions/${params.id}`, action)
                .then(() => navigate("/checkup-actions"));
        }
    };

    if (!action || !data) {
        return "Loading...";
    }

    return (
        <Box sx={{backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column", padding: 2}}>
            <Typography color="textPrimary" variant="subtitle1" component="h2">
                ID: {action.id}
            </Typography>
            <Divider/>
            <CheckupActionForm action={action}
                               data={data}
                               onChange={handleChange}
                               onSubmit={handleSubmit}
            />
        </Box>
    );
}
