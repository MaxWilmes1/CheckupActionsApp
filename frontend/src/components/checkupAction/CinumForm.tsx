import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
type Props = {
    action: CheckupAction;
    cinums: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function CinumForm(props: Props) {
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
            <InputLabel>CINUM</InputLabel>
            <Select
                name={"cinum"}
                value={props.action.cinum}
                onChange={props.onChange}
            >
                {props.cinums.map(cinum => (
                    <MenuItem key={cinum.id} value={cinum.info}>
                        {cinum.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}