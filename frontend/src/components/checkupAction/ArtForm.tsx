import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
type Props = {
    action: CheckupAction;
    arts: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function ArtForm(props: Props) {
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
            <InputLabel>ART</InputLabel>
            <Select
                name={"art"}
                value={props.action.art}
                onChange={props.onChange}
            >
                {props.arts.map(art => (
                    <MenuItem key={art.id} value={art.info}>
                        {art.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}