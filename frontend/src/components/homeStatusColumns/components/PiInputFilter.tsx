import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useManagedData} from "../../../utils/customHooks/useManagedData.ts";

type Props = {
    selectedPi: string;
    setSelectedPi: React.Dispatch<React.SetStateAction<string>>;
};

export default function PiInputFilter(props: Readonly<Props>) {
    const managedData = useManagedData();


    const handlePIChange = (event: SelectChangeEvent) => {
        props.setSelectedPi(event.target.value);
        localStorage.setItem("selectedPi", event.target.value);
    };

    return (
        <Box sx={{display: "flex", justifyContent: "flex-start", mb: 2}}>
            <FormControl sx={{minWidth: 200}} size="small">
                <InputLabel id="pi-select-label">PI select</InputLabel>
                <Select
                    labelId="pi-select-label"
                    value={props.selectedPi}
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
    );
}
