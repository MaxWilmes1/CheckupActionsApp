import {Box, Divider, Typography} from "@mui/material";
import dayjs from "dayjs";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction
};

export default function CheckupActionsDetailsHeader(props: Props) {
    return (
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography variant="h6" component="h1" color="textPrimary"
                                sx={{marginBottom: 0.5, fontWeight: "bold"}}>
                        Edit Checkup Action
                    </Typography>
                    <Typography variant="caption" component="h1" color="textPrimary">
                        Action ID: {props.action.id}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    paddingRight: 2,
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}>
                    <Typography variant="body2" component="p" color="textSecondary">
                        Created: {dayjs(props.action.dateCreated).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                    <Divider sx={{width: "100%"}}/>
                    <Typography variant="body2" component="p" color="textSecondary">
                        Last Edit: {dayjs(props.action.dateCreated).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                </Box>
            </Box>
            <Divider/>
        </Box>
    );
}