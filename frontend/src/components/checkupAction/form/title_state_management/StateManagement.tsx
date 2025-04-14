import {
    Box,
    Chip,
    Divider,
    IconButton,
    SelectChangeEvent,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
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
    isDetailsPage: boolean;
};

export default function StateManagement(props: Readonly<Props>) {
    const navigate = useNavigate();
    const params = useParams();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const statusTransitions: Record<Status, Status[]> = {
        OPEN: ["PLANNED"],
        PLANNED: ["IN_PROGRESS", "REACTIVE"],
        IN_PROGRESS: ["DONE"],
        REACTIVE: ["DONE"],
        DONE: ["OPEN"],
        CANCELLED: ["OPEN"]
    };

    const handleStatusChipClick = (nextStatus: Status) => {
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

    const getStatusColor = (status: Status): "error" | "success" | "info" | "warning" | "secondary" => {
        switch (status) {
            case "CANCELLED":
                return "error";
            case "DONE":
                return "success";
            case "OPEN":
                return "info";
            case "PLANNED":
                return "warning";
            default:
                return "secondary";
        }
    };

    const getTransitionColor = (targetStatus: Status): "error" | "success" | "info" | "warning" | "secondary" => {
        switch (targetStatus) {
            case "CANCELLED":
                return "error";
            case "DONE":
                return "success";
            case "PLANNED":
                return "warning";
            case "REACTIVE":
                return "secondary";
            case "OPEN":
                return "info";
            default:
                return "secondary";
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: isSmall ? "flex-start" : "center",
                width: "100%"
            }}
        >
            {/* Status & Moves */}
            {
                props.isDetailsPage &&
                <Box sx={{display: "flex", gap: 1.5, alignItems: "flex-start"}}>
                    {/* Status Info */}
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <Typography variant="body2" color="text.secondary">Status:</Typography>
                        <Chip
                            label={props.action?.status || "No status"}
                            size="small"
                            color={getStatusColor(props.action.status)}
                            variant="outlined"
                        />
                    </Box>

                    <Divider orientation="vertical" flexItem/>

                    {/* Status Transition Chips */}
                    <Stack spacing={0.5}>
                        {statusTransitions[props.action.status]?.map((targetStatus) => (
                            <Chip
                                key={targetStatus}
                                label={targetStatus.toLowerCase().replace("_", " ")}
                                variant="outlined"
                                size="small"
                                clickable
                                onClick={() => handleStatusChipClick(targetStatus)}
                                color={getTransitionColor(targetStatus)}
                                sx={{textTransform: "capitalize", minWidth: 100}}
                            />
                        ))}
                        {props.action.status !== "CANCELLED" && (
                            <Chip
                                label="cancelled"
                                variant="outlined"
                                size="small"
                                clickable
                                onClick={() => handleStatusChipClick("CANCELLED")}
                                color="error"
                                sx={{minWidth: 100}}
                            />
                        )}
                    </Stack>
                </Box>
            }

            {/* Save & Delete */}
            <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Save">
                    <IconButton color="primary" size="medium" type="submit">
                        <SaveIcon fontSize="medium"/>
                    </IconButton>
                </Tooltip>
                {props.isDetailsPage && (
                    <Tooltip title="Delete">
                        <IconButton color="error" size="medium" onClick={handleDelete}>
                            <DeleteIcon fontSize="medium"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        </Box>
    );
}