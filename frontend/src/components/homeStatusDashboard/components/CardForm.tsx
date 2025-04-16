import {Card, Divider, Typography} from "@mui/material";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import React, {forwardRef} from "react";

type Props = {
    action: CheckupAction;
    status: string;
    isDragging: boolean;
    onClick: () => void;
    style?: React.CSSProperties;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

const CardForm = forwardRef<HTMLDivElement, Props>(({
                                                        action,
                                                        status,
                                                        isDragging,
                                                        onClick,
                                                        style,
                                                        dragHandleProps
                                                    }, ref) => {
    const statusColors: Record<string, string> = {
        OPEN: "#0288d1",
        PLANNED: "#ffa000",
        IN_PROGRESS: "#7b1fa2",
        DONE: "#388e3c",
        CANCELLED: "#d32f2f",
        REACTIVE: "#7b1fa2",
    };

    return (
        <Card
            ref={ref}
            {...dragHandleProps}
            onClick={onClick}
            sx={{
                borderLeft: `5px solid ${statusColors[status]}`,
                padding: 1.5,
                borderRadius: 2,
                backgroundColor: isDragging ? "#f0f0f0" : "#fff",
                boxShadow: 2,
                cursor: "pointer",
                ...style
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
    );
});

export default CardForm;