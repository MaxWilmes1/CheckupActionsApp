import {Box, Divider, IconButton, SelectChangeEvent, Typography} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import CommentList from "./CommentList.tsx";
import {ChangeEvent} from "react";

type Props = {
    action: CheckupAction
    onClose: () => void;
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentBody(props: Readonly<Props>) {
    return (
        <Box
            sx={{
                width: "100%",
                height: '100%',
                boxShadow: 5,
                borderLeft: '1px solid #ddd',
                backgroundColor: '#fafafa',
                overflowY: 'auto',
                p: 2
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <IconButton onClick={props.onClose} sx={{mr: 2}}>
                    <ChevronRightIcon/>
                </IconButton>
                <Typography variant="h6">
                    Comments
                </Typography>
            </Box>

            <Divider sx={{mb: 2}}/>
            <CommentList action={props.action} onChange={props.onChange}/>
        </Box>
    );
}