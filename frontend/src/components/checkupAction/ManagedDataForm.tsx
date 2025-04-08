import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ManagedData} from "../../models/managed_data/ManagedData.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {ManagedDataType} from "../../models/managed_data/ManagedDataType.ts";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent) => void;
    type: ManagedDataType
}

export default function ManagedDataForm(props: Props) {
    const type = props.type.toLowerCase()
    const selectedValue = props.managedData.some(o => o.info === props.action[type as keyof CheckupAction])
        ? props.action[type as keyof CheckupAction]
        : ""

    return (
        <FormControl
            variant="standard"
            sx={{
                p: 1,
                width: "50%",
                backgroundColor: "#fff",
                borderRadius: 1
            }}
        >
            <InputLabel>{props.type}</InputLabel>
            <Select
                name={type}
                value={selectedValue}
                onChange={props.onChange}
                required={true}
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