import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    pis: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function PiForm(props: Props) {
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
            <InputLabel>PI</InputLabel>
            <Select
                name={"pi"}
                value={props.action.pi}
                onChange={props.onChange}
            >
                {props.pis.map(pi => (
                    <MenuItem key={pi.id} value={pi.info}>
                        {pi.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}