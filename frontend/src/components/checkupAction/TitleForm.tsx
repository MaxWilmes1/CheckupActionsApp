import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Data} from "../../models/data/Data.ts"
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    titles: Data[];
    onChange: (event: SelectChangeEvent) => void;
}

export default function TitleForm(props: Props) {
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
            <InputLabel>Title</InputLabel>
            <Select
                name={"title"}
                value={props.action.title}
                onChange={props.onChange}
            >
                {props.titles.map(title => (
                    <MenuItem key={title.id} value={title.info}>
                        {title.info}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}