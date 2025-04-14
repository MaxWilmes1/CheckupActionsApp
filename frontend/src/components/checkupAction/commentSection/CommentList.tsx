import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {Divider, List, Paper, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {NewComment} from "../../../models/checkupAction/NewComment.ts";
import {useUser} from "../../../utils/components/UserContext.tsx";
import Button from "@mui/material/Button";
import {UpdatedComment} from "../../../models/checkupAction/UpdatedComment.ts";

type Props = {
    action: CheckupAction
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CommentList(props: Readonly<Props>) {
    const {user} = useUser()

    const [isWriteNewComment, setIsWriteNewComment] = useState(false)
    const [newComment, setNewComment] = useState<NewComment>({comment: "", author: ""})

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [updatedComment, setUpdatedComment] = useState<UpdatedComment>({comment: ""})


    const handleCommentClick = () => {
        setIsWriteNewComment(!isWriteNewComment)
    }

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewComment(prev => ({
            ...prev,
            comment: event.target.value
        }));
    }

    const handleSaveCommentClick = (e: React.FormEvent<HTMLButtonElement>) => {
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

    const handleCancelSaveCommentClick = () => {
        setIsWriteNewComment(false)
        setNewComment({comment: "", author: ""})
    }

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
        <List sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            {
                isWriteNewComment
                    ? <><TextField
                        name={"newComment"}
                        id="outlined-multiline-static"
                        value={newComment.comment}
                        multiline
                        fullWidth
                        rows={10}
                        placeholder="Enter new comment"
                        onChange={handleCommentChange}
                        required={true}
                    />
                        <Button
                            variant={"contained"}
                            color={"error"}
                            type="button"
                            size={"small"}
                            onClick={handleCancelSaveCommentClick}
                            sx={{
                                alignSelf: "flex-end",
                                textTransform: "none"
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"success"}
                            type="button"
                            size={"small"}
                            onClick={handleSaveCommentClick}
                            sx={{
                                alignSelf: "flex-end",
                                textTransform: "none"
                            }}
                        >
                            Save
                        </Button></>
                    : <Button
                        variant={"contained"}
                        type="button"
                        onClick={handleCommentClick}
                        sx={{
                            alignSelf: "flex-end",
                            textTransform: "none"
                        }}>
                        Write new comment
                    </Button>


            }
            <Divider/>
            {props.action.comments.slice().reverse().map(o => (
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
                            ? <Button
                                color={"primary"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleEditClick(o.id, o.comment)}
                                sx={{
                                    textTransform: "none",
                                    alignSelf: "flex-end"
                                }}
                            >
                                edit
                            </Button>
                            : <><Button
                                color={"success"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleUpdate(o.id)}
                                sx={{
                                    textTransform: "none",
                                    alignSelf: "flex-end"
                                }}
                            >
                                save
                            </Button><Button
                                color={"secondary"}
                                variant={"contained"}
                                size={"small"}
                                onClick={() => handleCancelEditClick()}
                                sx={{
                                    textTransform: "none",
                                    alignSelf: "flex-end"
                                }}
                            >
                                cancel
                            </Button></>
                    }
                    <Button
                        color={"error"}
                        variant={"contained"}
                        size={"small"}
                        onClick={() => handleDeleteCommentClick(o.id)}
                        sx={{
                            textTransform: "none",
                            alignSelf: "flex-end"
                        }}
                    >
                        Delete
                    </Button>
                </Paper>
            ))}
        </List>
    );
}