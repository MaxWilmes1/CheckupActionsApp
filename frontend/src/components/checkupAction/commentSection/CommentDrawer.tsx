import {
    Box, SelectChangeEvent,
} from '@mui/material';
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import CommentBody from "./CommentBody.tsx";
import CommentHeader from "./CommentHeader.tsx";
import {ChangeEvent} from "react";

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
                <CommentBody action={props.action} onClose={props.onClose} onChange={props.onChange}/>
            )}
        </Box>
    );
}