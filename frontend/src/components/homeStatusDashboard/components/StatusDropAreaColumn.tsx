import {Card, CardContent, Stack, Typography} from "@mui/material";

import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import DragableActionCard from "./DragableActionCard.tsx";

type Props = {
    status: string;
    data: CheckupAction[];
};

export default function StatusDropAreaColumn(props: Readonly<Props>) {


    return (
        <Card variant="outlined" sx={{borderRadius: 3, bgcolor: "#fafafa", minHeight: 400}}>
            <CardContent>
                <Typography variant="h6" gutterBottom textAlign="center">
                    {props.status}
                </Typography>
                <Stack spacing={1}>
                    {
                        props.data.map((action, index) => (
                            <DragableActionCard key={action.id} status={props.status} action={action} index={index}/>
                        ))
                    }

                    {
                        props.data.length === 0 && (
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                No actions available
                            </Typography>
                        )
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}