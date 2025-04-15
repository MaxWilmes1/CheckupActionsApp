import {useEffect, useState} from "react";
import {CheckupAction} from "../models/checkupAction/CheckupAction.ts";
import axios from "axios";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import StatusColumn from "../components/homeStatusColumns/StatusColumn.tsx";
import {useManagedData} from "../utils/customHooks/useManagedData.ts";
import HasRole from "../utils/components/HasRole.tsx";
import Divider from "@mui/material/Divider";

export default function Home() {
    const [data, setData] = useState<CheckupAction[]>([]);
    const managedData = useManagedData();
    const [selectedPi, setSelectedPi] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/api/checkup-actions")
            .then(r => setData(r.data))
            .catch(error => console.error("Error fetching data", error));
    };

    const handlePIChange = (event: SelectChangeEvent) => {
        setSelectedPi(event.target.value)
    }

    return (
        <HasRole>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
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
                <Divider
                    sx={{mb: 2, borderBottomWidth: 2, borderColor: "primary.main"}}
                />
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                    }}
                >
                    {["OPEN", "PLANNED", "IN_PROGRESS", "DONE", "CANCELLED"].map(status => (
                        <StatusColumn
                            key={status}
                            status={status}
                            data={data.filter(o => o.status === status && o.pi === selectedPi)}/>
                    ))}
                </Box>
            </Box>
        </HasRole>

    );
}
