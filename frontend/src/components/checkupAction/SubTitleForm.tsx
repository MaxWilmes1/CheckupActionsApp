import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    subtitles: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function SubTitleForm(props: Props) {
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
            <InputLabel>Sub-Title</InputLabel>
            <Select
                name={"subtitle"}
                value={props.action.subtitle}
                onChange={props.onChange}
            >
                {props.subtitles.map(subtitle => (
                    <MenuItem key={subtitle.id} value={subtitle.info}>
                        {subtitle.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}