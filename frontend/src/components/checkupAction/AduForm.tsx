import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
type Props = {
    action: CheckupAction;
    adus: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function AduForm(props: Props) {
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
            <InputLabel>ADU</InputLabel>
            <Select
                name={"adu"}
                value={props.action.adu}
                onChange={props.onChange}
            >
                {props.adus.map(adu => (
                    <MenuItem key={adu.id} value={adu.info}>
                        {adu.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}