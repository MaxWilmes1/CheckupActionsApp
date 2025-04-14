import {Box, TextField} from "@mui/material";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DescriptionForm(props: Readonly<Props>) {
    return (
        <Box sx={{marginTop: 0.5}}>
            <TextField
                name={"description"}
                value={props.action.description}
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={5}
                placeholder="Enter description"
                onChange={props.onChange}
                required={true}
            />
        </Box>
    );
}
