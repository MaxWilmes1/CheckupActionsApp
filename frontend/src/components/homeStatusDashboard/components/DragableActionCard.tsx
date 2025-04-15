import {Card, Divider, Typography} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";

type Props = {
    status: string;
    action: CheckupAction
    index: number;
};

export default function DragableActionCard(props: Readonly<Props>) {
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
        <Draggable key={props.action.id} draggableId={props.action.id} index={props.index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => handleClick(props.action.id)}
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
                        {props.action.adu}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {props.action.application}
                    </Typography>
                    <Divider sx={{m: 1}}/>
                    <Typography variant="body2" color="textPrimary">
                        {props.action.title}
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                        {props.action.subtitle}
                    </Typography>
                </Card>
            )}
        </Draggable>
    );
}