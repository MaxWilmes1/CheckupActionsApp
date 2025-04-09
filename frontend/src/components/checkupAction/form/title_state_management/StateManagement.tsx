import {Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";


export default function StateManagement() {
    return (
        <Box
            sx={{
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                width: "50%",
            }}
        >
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                size={"medium"}
            >
                <SaveIcon/>
            </Button>
        </Box>
    );
}
