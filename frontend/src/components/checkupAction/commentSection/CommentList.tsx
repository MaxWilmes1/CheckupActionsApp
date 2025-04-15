import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {Divider, List, SelectChangeEvent} from "@mui/material";
import {ChangeEvent} from "react";
import NewCommentForm from "./components/NewCommentForm.tsx";
import CommentListForm from "./components/CommentListForm.tsx";

type Props = {
    action: CheckupAction
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentList(props: Readonly<Props>) {

    return (
        <List sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: "1rem"
        }}
        >
            <NewCommentForm action={props.action} onChange={props.onChange}/>
            <Divider/>
            <CommentListForm action={props.action} onChange={props.onChange}/>
        </List>
    );
}