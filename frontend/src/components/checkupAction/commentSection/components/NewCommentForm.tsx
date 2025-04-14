import React, {ChangeEvent, useState} from 'react';
import {Box, SelectChangeEvent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import axios from "axios";
import {useUser} from "../../../../utils/components/UserContext.tsx";

type Props = {
    action: CheckupAction;
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function NewCommentForm(props: Readonly<Props>) {
    const {user} = useUser();
    const [isWriteNewComment, setIsWriteNewComment] = useState(false);
    const [newComment, setNewComment] = useState({comment: "", author: ""});

    const handleCommentClick = () => {
        setIsWriteNewComment(!isWriteNewComment);
    };

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewComment(prev => ({
            ...prev,
            comment: event.target.value
        }));
    };

    const handleSaveCommentClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newComment.comment.trim() === "") return;
        axios.post(`/api/checkup-actions/${props.action.id}/comments`, {
            ...newComment,
            author: user?.username
        })
            .then((response) => {
                const updatedComments = response.data.comments;
                setNewComment({comment: "", author: ""});
                props.onChange({
                    target: {
                        name: "comments",
                        value: updatedComments
                    }
                } as SelectChangeEvent);
            })
            .catch((e) => {
                console.error("Error adding comment:", e);
            });
    };

    const handleCancelSaveCommentClick = () => {
        setIsWriteNewComment(false);
        setNewComment({comment: "", author: ""});
    };

    return (
        <>
            {isWriteNewComment ? (
                <Box sx={{display: "flex", flexDirection: "column", gap: 0.5, marginBottom: 0}}>
                    <TextField
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
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent:"flex-end" ,gap: 1}}>
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
                            save
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Button
                    variant={"contained"}
                    type="button"
                    onClick={handleCommentClick}
                    sx={{
                        alignSelf: "flex-end",
                        textTransform: "none"
                    }}
                >
                    Write new comment
                </Button>
            )}
        </>
    );
}