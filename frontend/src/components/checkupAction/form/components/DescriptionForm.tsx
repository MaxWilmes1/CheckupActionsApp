import {Box, TextField} from "@mui/material";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DescriptionForm(props: Readonly<Props>) {
    return (
        <Box sx={{marginTop: "1rem", marginBottom: "1rem"}}>
            <TextField
                name={"description"}
                value={props.action.description}
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={10}
                placeholder="Enter description"
                onChange={props.onChange}
                required={true}
            />
        </Box>
    );
}
