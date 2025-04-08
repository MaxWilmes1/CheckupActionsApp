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
                marginBottom: 2
            }}>
                <Typography variant="h6" component="h1" color="textPrimary" sx={{fontWeight: "bold"}}>
                    Action ID: {props.action.id}
                </Typography>
                <Box>
                    <Typography variant="body2" component="p" color="textSecondary" >
                        Created: {dayjs(props.action.dateCreated).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body2" component="p" color="textSecondary">
                        Last Edit: {dayjs(props.action.dateCreated).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                </Box>
            </Box>
            <Divider/>
        </Box>
    );
}