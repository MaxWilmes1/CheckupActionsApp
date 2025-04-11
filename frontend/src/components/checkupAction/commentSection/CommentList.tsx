import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {Divider, List, Paper, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {NewComment} from "../../../models/checkupAction/NewComment.ts";
import {useUser} from "../../../utils/components/UserContext.tsx";

type Props = {
    action: CheckupAction
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentList(props: Props) {
    const {user} = useUser()
    const [newComment, setNewComment] = useState<NewComment>({comment: "", author: ""})

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewComment(prev => ({
            ...prev,
            comment: event.target.value
        }));
    }

    const handleAddComment = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newComment.comment.trim() === "") return
        axios.post(`/api/checkup-actions/${props.action.id}/comments`, {
            ...newComment,
            author: user?.username
        })
            .then((response) => {
                const updatedComments = response.data.comments
                setNewComment({comment: "", author: ""})
                props.onChange({
                    target: {
                        name: "comments",
                        value: updatedComments
                    }
                } as SelectChangeEvent)
            })
            .catch((e) => {
                console.error("Error adding comment:", e)
            })
    }

    return (
        <List sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField
                name={"newComment"}
                id="outlined-multiline-static"
                value={newComment.comment}
                multiline
                fullWidth
                rows={2}
                placeholder="Enter new comment"
                onChange={handleCommentChange}
                required={true}
            />
            <button type="button" onClick={handleAddComment}>Add Comment</button>

            {props.action.comments.slice().reverse().map((o, index) => (
                <Paper
                    key={index}
                    elevation={1}
                    sx={{p: 2, backgroundColor: '#fff'}}
                >
                    <Typography variant="body1" sx={{mb: 1}}>
                        {o.comment}
                    </Typography>

                    <Divider sx={{my: 1}}/>

                    <Typography variant="body2" color="text.secondary">
                        Author: <strong>{o.author}</strong>
                    </Typography>

                    <Typography variant="caption" color="primary">
                        Created: {new Date(o.dateCreated).toLocaleString()}
                        {o.dateLastEdit && o.dateLastEdit !== o.dateCreated && (
                            <> · Edited: {new Date(o.dateLastEdit).toLocaleString()}</>
                        )}
                    </Typography>
                </Paper>
            ))}
        </List>
    );
}