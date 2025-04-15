import {useEffect, useState} from "react";
import {CheckupAction} from "../models/checkupAction/CheckupAction.ts";
import axios from "axios";
import {
    Box,
    Divider
} from "@mui/material";
import HasRole from "../utils/components/HasRole.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {Status} from "../models/checkupAction/Status.ts";
import PiInputFilter from "../components/homeStatusColumns/components/PiInputFilter.tsx";
import StatusDashboard from "../components/homeStatusColumns/StatusDashboard.tsx";

export default function Home() {
    const [data, setData] = useState<CheckupAction[]>([]);
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

    return (
        <HasRole>
            <Box sx={{display: "flex", flexDirection: "column", p: 3}}>
                <PiInputFilter selectedPi={selectedPi} setSelectedPi={setSelectedPi}/>

                <Divider sx={{mb: 2, borderBottomWidth: 2, borderColor: "primary.main"}}/>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <StatusDashboard data={data} selectedPi={selectedPi}/>
                </DragDropContext>
            </Box>
        </HasRole>
    );
}
