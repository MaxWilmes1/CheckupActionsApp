import {
    Box,
    Chip,
    IconButton,
    SelectChangeEvent,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";
import {Status} from "../../../../models/checkupAction/Status.ts";

type Props = {
    action: CheckupAction;
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function StateManagement(props: Props) {
    const navigate = useNavigate();
    const params = useParams();

    const statusTransitions: Record<Status, Status[]> = {
        OPEN: ["PLANNED"],
        PLANNED: ["IN_PROGRESS", "REACTIVE"],
        IN_PROGRESS: ["DONE"],
        REACTIVE: ["DONE"],
        DONE: ["OPEN"],
        CANCELLED: ["OPEN"]
    };

    const handleClick = (nextStatus: Status) => {
        const updatedAction = {...props.action, status: nextStatus};

        axios.put(`/api/checkup-actions/${props.action.id}`, updatedAction)
            .then(() => {
                props.onChange({
                    target: {name: "status", value: updatedAction.status}
                } as ChangeEvent<HTMLInputElement>);
            })
            .catch(error => {
                console.error("Error updating status:", error);
            });
    };

    const handleDelete = () => {
        axios.delete(`/api/checkup-actions/${params.id}`)
            .then(() => navigate("/checkup-actions"))
            .catch(error => console.error("Error deleting item", error));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                width: "100%",
                padding: 1,
            }}
        >
            {/* Status Anzeige */}
            <Box sx={{display: "flex", alignItems: "center", gap: 1, minWidth: 150}}>
                <Typography variant="body2" color="text.secondary">Status:</Typography>
                <Chip
                    label={props.action?.status || "No status"}
                    size="small"
                    color={
                        props.action.status === "CANCELLED"
                            ? "error"
                            : props.action.status === "DONE"
                                ? "success"
                                : "info"
                    }
                    variant="outlined"
                />
            </Box>

            {/* Statuswechsel mit Chips */}
            <Stack direction="row" spacing={1} sx={{flexWrap: "wrap"}}>
                {statusTransitions[props.action.status]?.map((targetStatus) => (
                    <Chip
                        key={targetStatus}
                        label={targetStatus.toLowerCase().replace("_", " ")}
                        variant="outlined"
                        size="small"
                        clickable
                        onClick={() => handleClick(targetStatus)}
                        sx={{textTransform: "capitalize"}}
                        color="info"
                    />
                ))}
                {props.action.status !== "CANCELLED" && (
                    <Chip
                        label="cancelled"
                        variant="outlined"
                        size="small"
                        clickable
                        onClick={() => handleClick("CANCELLED")}
                        color="error"
                    />
                )}
            </Stack>

            {/* Save & Delete */}
            <Stack direction="row" spacing={1} sx={{minWidth: 160, justifyContent: "flex-end"}}>
                <Tooltip title="Save">
                    <IconButton color="primary" size="small" type="submit">
                        <SaveIcon/>
                    </IconButton>
                </Tooltip>
                {params.id && (
                    <Tooltip title="Delete">
                        <IconButton color="error" size="small" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        </Box>
    );
}
