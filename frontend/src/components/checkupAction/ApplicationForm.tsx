import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
type Props = {
    action: CheckupAction;
    applications: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function ApplicationForm(props: Props) {
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
            <InputLabel>Applications</InputLabel>
            <Select
                name={"application"}
                value={props.action.application}
                onChange={props.onChange}
            >
                {props.applications.map(app => (
                    <MenuItem key={app.id} value={app.info}>
                        {app.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}