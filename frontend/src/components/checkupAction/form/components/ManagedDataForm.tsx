import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ManagedData} from "../../../../models/managed_data/ManagedData.ts"
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import {ManagedDataType} from "../../../../models/managed_data/ManagedDataType.ts";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent) => void;
    type: ManagedDataType
}

export default function ManagedDataForm(props: Props) {
    const label = props.type === "ART" || props.type === "ADU" || props.type === "PI" || props.type === "CINUM"
        ? props.type
        : props.type.charAt(0).toUpperCase() + props.type.slice(1).toLowerCase();
    const type = props.type.toLowerCase()
    const selectedValue = props.managedData.some(o => o.info === props.action[type as keyof CheckupAction])
        ? props.action[type as keyof CheckupAction]
        : ""

    return (
        <FormControl
            variant="outlined"
            fullWidth={false}
            size="small"
            required
            sx={{
                borderRadius: 1,
                marginBottom: 1.5
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                name={type}
                value={selectedValue}
                onChange={props.onChange}
                label={props.type}
            >

                {props.managedData.map(o => (
                    <MenuItem key={o.id} value={o.info}>
                        {o.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}