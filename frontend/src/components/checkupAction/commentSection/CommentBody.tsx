import {Box, Divider, IconButton, SelectChangeEvent, Typography} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import CommentList from "./CommentList.tsx";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction;
    onClose: () => void;
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentBody(props: Readonly<Props>) {
    return (
        <Box
            sx={{
                borderLeft: '1px solid #ddd',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton onClick={props.onClose}>
                    <ChevronRightIcon/>
                </IconButton>
                <Typography variant="h6">
                    Comments
                </Typography>
            </Box>

            <Divider/>

            <Box>
                <CommentList action={props.action} onChange={props.onChange}/>
            </Box>
        </Box>
    );
}
