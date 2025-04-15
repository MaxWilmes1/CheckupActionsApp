import {Box, Divider} from "@mui/material";
import StatusColumn from "./components/StatusColumn.tsx";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    data: CheckupAction[];
    selectedPi: string;
};

export default function StatusDashboard(props: Readonly<Props>) {
    const statuses = ["OPEN", "PLANNED", "IN_PROGRESS", "DONE", "CANCELLED"];
    const reactiveStatus = ["REACTIVE"];

    return (
        <Box>
            <Box sx={{display: "flex", gap: "2rem"}}>
                {statuses.map(status => (
                    <StatusColumn
                        key={status}
                        status={status}
                        data={props.data.filter(o => o.status === status && o.pi === props.selectedPi)}
                    />
                ))}
            </Box>
            <Divider sx={{mt: 2, mb: 2, borderBottomWidth: 2}}/>
            <Box sx={{display: "flex", gap: "2rem"}}>
                {reactiveStatus.map(status => (
                    <StatusColumn
                        key={status}
                        status={status}
                        data={props.data.filter(o => o.status === status && o.pi === props.selectedPi)}
                    />
                ))}
            </Box>
        </Box>
    );
}
