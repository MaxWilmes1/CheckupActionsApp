import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {Divider, List, Paper, Typography} from "@mui/material";

type Props = {
    action: CheckupAction
};

export default function CommentList(props: Props) {
    return (
        <List sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            {props.action.comments.map((comment, index) => (
                <Paper
                    key={index}
                    elevation={1}
                    sx={{p: 2, backgroundColor: '#fff'}}
                >
                    <Typography variant="body1" sx={{mb: 1}}>
                        {comment.comment}
                    </Typography>

                    <Divider sx={{my: 1}}/>

                    <Typography variant="body2" color="text.secondary">
                        Author: <strong>{comment.author}</strong>
                    </Typography>

                    <Typography variant="caption" color="primary">
                        Created: {new Date(comment.dateCreated).toLocaleString()}
                        {comment.dateLastEdit && comment.dateLastEdit !== comment.dateCreated && (
                            <> · Edited: {new Date(comment.dateLastEdit).toLocaleString()}</>
                        )}
                    </Typography>
                </Paper>
            ))}
        </List>
    );
}