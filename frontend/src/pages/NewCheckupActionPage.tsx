import {useNavigate} from "react-router-dom";
import {SelectChangeEvent, Box} from "@mui/material";
import {useCheckupAction} from "../utils/customHooks/useCheckupAction.ts";
import {useData} from "../utils/customHooks/useData.ts";
import CheckupActionForm from "../components/checkupAction/CheckupActionForm.tsx";
import axios from "axios";

export default function NewCheckupActionPage() {
    const {action, setAction} = useCheckupAction();
    const navigate = useNavigate();
    const data = useData();

    const handleChange = (event: SelectChangeEvent) => {
        const newTitle = event.target.value;
        setAction(prevAction => prevAction ? {...prevAction, title: newTitle} : null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action) {
            axios.post("/api/checkup-actions", action)
                .then(() => navigate("/checkup-actions"));
        }
    };

    if (action === null || !data) {
        return "Loading...";
    }

    return (
        <Box sx={{backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column", padding: 2}}>
            <CheckupActionForm action={action}
                               data={data}
                               onChange={handleChange}
                               onSubmit={handleSubmit}
            />
        </Box>
    );
}
