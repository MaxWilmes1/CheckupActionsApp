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
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: 1,
                    m: 1,
                    p: 0,
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
                        whiteSpace: 'nowrap',
                        fontSize: '1.2rem',
                        letterSpacing: '0.4em',
                        color: 'darkgray',
                        fontWeight: 'bold',
                    }}
                >
                    Comments
                </Typography>
            </Box>
        </Tooltip>
    );
}
