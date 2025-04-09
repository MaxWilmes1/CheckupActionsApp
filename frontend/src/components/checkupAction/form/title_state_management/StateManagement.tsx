import {Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";


export default function StateManagement() {
    const navigate = useNavigate()
    const params = useParams()

    const handleDelete = () => {
        axios.delete(`/api/checkup-actions/${params.id}`)
            .then(() => {
                navigate("/checkup-actions")
            })
            .catch(error => {
                console.error("Error deleting item", error);
            });
    };

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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1
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
                {
                    params.id && <Button
                        variant="outlined"
                        color="error"
                        size={"medium"}
                        onClick={handleDelete}
                    >
                        <DeleteIcon/>
                    </Button>
                }
            </Box>
        </Box>
    );
}
