import {Box, Card, CardContent, Typography, Stack} from "@mui/material";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";

type Props = {
    status: string;
    data: CheckupAction[];
};

const statusColors: Record<string, string> = {
    OPEN: "#fff3cd",
    PLANNED: "#d1ecf1",
    IN_PROGRESS: "#cce5ff",
    DONE: "#d4edda",
    CANCELLED: "#f8d7da"
};

export default function StatusColumn(props: Readonly<Props>) {
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate("/checkup-actions/" + id);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            <Card
                variant="outlined"
                sx={{borderRadius: 3, bgcolor: "#fafafa", minHeight: 600}}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom textAlign="center">
                        {props.status}
                    </Typography>
                    <Stack spacing={1}>
                        {props.data.map(action => (
                            <Card
                                key={action.id}
                                variant="outlined"
                                onClick={() => handleClick(action.id)}
                                sx={{
                                    borderLeft: `5px solid ${statusColors[props.status]}`,
                                    padding: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: "#fff",
                                    boxShadow: 2
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {action.adu}
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {action.application}
                                </Typography>
                                <Divider sx={{m: 1}}/>
                                <Typography variant="body2" color="textPrimary">
                                    {action.title}
                                </Typography>
                                <Typography variant="body2" mt={0.5}>
                                    {action.subtitle}
                                </Typography>
                            </Card>
                        ))}
                        {props.data.length === 0 && (
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                No actions available
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
