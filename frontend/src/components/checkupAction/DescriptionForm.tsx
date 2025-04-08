import { TextField} from "@mui/material";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DescriptionForm(props: Props) {
    return (
        <TextField
            name={"description"}
            value={props.action.description}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
            placeholder="Enter description"
            onChange={props.onChange}
            required={true}
        />
    );
}
