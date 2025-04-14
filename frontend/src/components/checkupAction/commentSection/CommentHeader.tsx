import {IconButton} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

type Props = {
    onOpen: () => void;
};

export default function CommentHeader(props: Readonly<Props>) {
    return (
        <IconButton
            onClick={props.onOpen}
            sx={{
                backgroundColor: 'white',
                alignSelf: 'flex-start',
                boxShadow: 1,
                m: 1
            }}
        >
            <CommentIcon/>
        </IconButton>
    );
}
