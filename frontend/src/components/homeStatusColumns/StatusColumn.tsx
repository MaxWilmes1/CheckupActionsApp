import {Box, Card, CardContent, Typography, Stack} from "@mui/material";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

type Props = {
    status: string;
    data: CheckupAction[];
};

export default function StatusColumn(props: Readonly<Props>) {
    const theme = useTheme();

    const statusColors: Record<string, string> = {
        OPEN: theme.palette.info.main,
        PLANNED: theme.palette.warning.main,
        IN_PROGRESS: theme.palette.secondary.main,
        DONE: theme.palette.success.main,
        CANCELLED: theme.palette.error.main,
        REACTIVE: theme.palette.secondary.main,
    };

    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate("/checkup-actions/" + id);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            <Card
                variant="outlined"
                sx={{borderRadius: 3, bgcolor: "#fafafa", minHeight: 400}}
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
