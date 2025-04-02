import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import axios from "axios";
import {NavLink} from "react-router-dom";
import AdminOnly from "../../utils/AdminOnly.tsx";
import Box from '@mui/material/Box';
import {Paper} from "@mui/material";

type Props = {
    action: CheckupAction
    fetchActions: () => void
};

export default function CheckupActionCard(props: Readonly<Props>) {

    const deleteActions = () => {
        axios.delete(`api/checkup-actions/${props.action.id}`)
            .then(props.fetchActions)
    }

    return (
        <Box padding={2} >
            <Paper elevation={6}>
                <Box padding={1}>
                <p>{props.action.title}</p>
                <AdminOnly>
                    <button className={"button-delete"} onClick={deleteActions}>delete</button>
                </AdminOnly>

                <NavLink to={`/checkup-actions/${props.action.id}`}>Details</NavLink>
                </Box>
            </Paper>
        </Box>
    )
}
