import {Box} from "@mui/material";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {Droppable} from "@hello-pangea/dnd";
import StatusDropAreaColumn from "./StatusDropAreaColumn.tsx";

type Props = {
    status: string;
    data: CheckupAction[];
};

export default function StatusDashboardArea(props: Readonly<Props>) {

    return (
        <Droppable droppableId={props.status}>
            {(provided) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{display: "flex", flexDirection: "column", width: "100%"}}
                >
                    <StatusDropAreaColumn status={props.status} data={props.data}/>
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    );
}