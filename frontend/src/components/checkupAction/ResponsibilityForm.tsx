import { TextField} from "@mui/material";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ResponsibilityForm(props: Props) {
    return (
        <TextField
            name={"responsibility"}
            size={"small"}
            value={props.action.responsibility}
            id="outlined-multiline-static"
            label="Responsibility"
            rows={1}
            placeholder="Enter responsibility"
            onChange={props.onChange}
            required={true}
        />
    );
}
