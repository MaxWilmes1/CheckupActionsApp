import {Box, Divider, Paper, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {ChangeEvent, useState} from "react";
import {UpdatedComment} from "../../../../models/checkupAction/UpdatedComment.ts";
import axios from "axios";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentListForm(props: Readonly<Props>) {

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [updatedComment, setUpdatedComment] = useState<UpdatedComment>({comment: ""})

    const handleDeleteCommentClick = (commentId: string) => {
        axios.delete(`/api/checkup-actions/${props.action.id}/comments/${commentId}`)
            .then((response) => {
                const updatedComments = response.data.comments
                props.onChange({
                    target: {
                        name: "comments",
                        value: updatedComments
                    }
                } as SelectChangeEvent)
            })
            .catch((e) => {
                console.error("Error deleting comment:", e)
            })
    }

    const handleUpdate = (commentId: string) => {
        axios.put(`/api/checkup-actions/${props.action.id}/comments/${commentId}`, updatedComment)
            .then((response) => {
                const updatedComments = response.data.comments
                props.onChange({
                    target: {
                        name: "comments",
                        value: updatedComments
                    }
                } as SelectChangeEvent)
                setEditingCommentId(null)
                setUpdatedComment({comment: ""})
            })
            .catch((e) => {
                console.error("Error editing comment:", e)
            })
    }

    const handleEditClick = (commentId: string, currentComment: string) => {
        setEditingCommentId(commentId)
        setUpdatedComment({comment: currentComment})
    }

    const handleCancelEditClick = () => {
        setEditingCommentId(null)
        setUpdatedComment({comment: ""})
    }

    return (
        props.action.comments.slice().reverse().map(o => (
            <Paper
                key={o.id}
                elevation={5}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 3,
                    mb: 0.5
                }}
            >
                {
                    editingCommentId === o.id
                        ? <TextField
                            name={"comment"}
                            id="outlined-multiline-static"
                            value={updatedComment.comment}
                            multiline
                            fullWidth
                            rows={10}
                            placeholder="Edit comment"
                            onChange={(e) => setUpdatedComment({comment: e.target.value})}
                        ></TextField>
                        : <Typography variant="body1" sx={{mb: 1}}>
                            {o.comment}
                        </Typography>
                }

                <Divider sx={{my: 1}}/>

                <Typography variant="body2" color="text.secondary">
                    Author: <strong>{o.author}</strong>
                </Typography>

                <Typography variant="caption" color="primary">
                    Created: {new Date(o.dateCreated).toLocaleString()}
                    {o.dateLastEdit &&
                        new Date(o.dateLastEdit).getTime() !== new Date(o.dateCreated).getTime() && (
                            <> · Edited: {new Date(o.dateLastEdit).toLocaleString()}</>
                        )}
                </Typography>
                <Divider sx={{my: 1}}/>
                {
                    editingCommentId !== o.id
                        ? <Box
                        sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 1 }}
                        >
                            <Button
                                color={"primary"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleEditClick(o.id, o.comment)}
                                sx={{
                                    textTransform: "none"
                                }}
                            >
                                edit
                            </Button>
                            <Button
                                color={"error"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleDeleteCommentClick(o.id)}
                                sx={{
                                    textTransform: "none"
                                }}
                            >
                                delete
                            </Button>
                        </Box>
                        : <Box
                            sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 1 }}
                        >
                            <Button
                                color={"error"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleCancelEditClick()}
                                sx={{
                                    textTransform: "none"
                                }}
                            >
                                cancel
                            </Button>
                            <Button
                                color={"success"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleUpdate(o.id)}
                                sx={{
                                    textTransform: "none"
                                }}
                            >
                                save
                            </Button>
                        </Box>
                }
            </Paper>
        ))
    );
}