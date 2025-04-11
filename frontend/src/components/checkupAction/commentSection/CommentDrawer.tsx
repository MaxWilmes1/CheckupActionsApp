import {
    Box,
} from '@mui/material';
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {ChangeEvent} from "react";
import {SelectChangeEvent} from "@mui/material";
import CommentBody from "./CommentBody.tsx";
import CommentHeader from "./CommentHeader.tsx";

type Props = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    action: CheckupAction;
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentDrawer(props: Props) {
    return (
        <Box
            sx={{display: 'flex', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#fafafa'}}>
            {!props.open && (
                <CommentHeader onOpen={props.onOpen}/>
            )}

            {props.open && (
                <CommentBody action={props.action} onClose={props.onClose}/>
            )}
        </Box>
    );
}
