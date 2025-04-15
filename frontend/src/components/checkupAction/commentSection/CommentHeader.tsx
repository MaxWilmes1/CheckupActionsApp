import { IconButton, Tooltip, Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
    onOpen: () => void;
};

export default function CommentHeader(props: Readonly<Props>) {
    return (
        <Tooltip title="Open comments">
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 1,
                }}
            >
                <IconButton onClick={props.onOpen}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography
                    variant="caption"
                    sx={{
                        mt: 9,
                        transform: 'rotate(90deg)',
                        fontSize: '1.2rem',
                        letterSpacing: '0.4em',
                        fontWeight: 'bold',
                        color: 'gray',
                    }}
                >
                    Comments
                </Typography>
            </Box>
        </Tooltip>
    );
}
