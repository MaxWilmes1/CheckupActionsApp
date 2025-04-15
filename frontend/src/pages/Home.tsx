import {useEffect, useState} from "react";
import {CheckupAction} from "../models/checkupAction/CheckupAction.ts";
import axios from "axios";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Divider
} from "@mui/material";
import StatusColumn from "../components/homeStatusColumns/StatusColumn.tsx";
import {useManagedData} from "../utils/customHooks/useManagedData.ts";
import HasRole from "../utils/components/HasRole.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {Status} from "../models/checkupAction/Status.ts";

export default function Home() {
    const [data, setData] = useState<CheckupAction[]>([]);
    const managedData = useManagedData();
    const [selectedPi, setSelectedPi] = useState<string>(() => {
        return localStorage.getItem("selectedPi") ?? "";
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/api/checkup-actions")
            .then(r => setData(r.data))
            .catch(error => console.error("Error fetching data", error));
    };

    const handlePIChange = (event: SelectChangeEvent) => {
        setSelectedPi(event.target.value);
        localStorage.setItem("selectedPi", event.target.value);
    };

    const handleDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;

        if (!destination || destination.droppableId === source.droppableId) return;

        const movedAction = data.find(action => action.id.toString() === draggableId)
        if (!movedAction) return;
        const updatedAction: CheckupAction = {
            ...movedAction,
            status: destination.droppableId as Status,
        }

        axios
            .put(`/api/checkup-actions/${draggableId}`, updatedAction)
            .catch(console.error);

        setData(prevData =>
            prevData.map(action =>
                action.id === movedAction.id ? updatedAction : action
            )
        );
    };


    const statuses = ["OPEN", "PLANNED", "IN_PROGRESS", "DONE", "CANCELLED"];
    const reactiveStatus = ["REACTIVE"];

    return (
        <HasRole>
            <Box sx={{display: "flex", flexDirection: "column", p: 3}}>
                <Box sx={{display: "flex", justifyContent: "flex-start", mb: 2}}>
                    <FormControl sx={{minWidth: 200}} size="small">
                        <InputLabel id="pi-select-label">PI select</InputLabel>
                        <Select
                            labelId="pi-select-label"
                            value={selectedPi}
                            onChange={handlePIChange}
                            label="PI select"
                        >
                            {managedData
                                .filter(o => o.type === "PI")
                                .reverse()
                                .map(o => (
                                    <MenuItem key={o.id} value={o.info}>
                                        {o.info}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider sx={{mb: 2, borderBottomWidth: 2, borderColor: "primary.main"}}/>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Box sx={{display: "flex", gap: "2rem"}}>
                        {statuses.map(status => (
                            <StatusColumn
                                key={status}
                                status={status}
                                data={data.filter(o => o.status === status && o.pi === selectedPi)}
                            />
                        ))}
                    </Box>
                    <Divider sx={{mt: 2, mb: 2, borderBottomWidth: 2}}/>
                    <Box sx={{display: "flex", gap: "2rem"}}>
                        {reactiveStatus.map(status => (
                            <StatusColumn
                                key={status}
                                status={status}
                                data={data.filter(o => o.status === status && o.pi === selectedPi)}
                            />
                        ))}
                    </Box>
                </DragDropContext>
            </Box>
        </HasRole>
    );
}
