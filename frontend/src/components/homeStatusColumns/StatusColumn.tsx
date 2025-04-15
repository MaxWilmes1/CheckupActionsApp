import {Box, Card, CardContent, Typography, Stack, Divider} from "@mui/material";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {Droppable, Draggable} from "@hello-pangea/dnd";

type Props = {
    status: string;
    data: CheckupAction[];
};

export default function StatusColumn(props: Readonly<Props>) {
    const theme = useTheme();
    const navigate = useNavigate();

    const statusColors: Record<string, string> = {
        OPEN: theme.palette.info.main,
        PLANNED: theme.palette.warning.main,
        IN_PROGRESS: theme.palette.secondary.main,
        DONE: theme.palette.success.main,
        CANCELLED: theme.palette.error.main,
        REACTIVE: theme.palette.secondary.main,
    };

    const handleClick = (id: string) => {
        navigate("/checkup-actions/" + id);
    };

    return (
        <Droppable droppableId={props.status}>
            {(provided) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{display: "flex", flexDirection: "column", width: "100%"}}
                >
                    <Card variant="outlined" sx={{borderRadius: 3, bgcolor: "#fafafa", minHeight: 400}}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom textAlign="center">
                                {props.status}
                            </Typography>
                            <Stack spacing={1}>
                                {props.data.map((action, index) => (
                                    <Draggable key={action.id} draggableId={action.id} index={index}>
                                        {(provided, snapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => handleClick(action.id)}
                                                sx={{
                                                    borderLeft: `5px solid ${statusColors[props.status]}`,
                                                    padding: 1.5,
                                                    borderRadius: 2,
                                                    backgroundColor: snapshot.isDragging ? "#f0f0f0" : "#fff",
                                                    boxShadow: 2,
                                                    ...provided.draggableProps.style
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
                                        )}
                                    </Draggable>
                                ))}
                                {props.data.length === 0 && (
                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        No actions available
                                    </Typography>
                                )}
                                {provided.placeholder}
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Droppable>
    );
}
