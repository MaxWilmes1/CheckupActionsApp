import {CheckupAction} from "../models/CheckupAction.ts";
import axios from "axios";
import {NavLink} from "react-router-dom";
import AdminOnly from "../utils/AdminOnly.tsx";

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
        <div className={"card"}>
            <p>{props.action.title}</p>
            <AdminOnly>
                <button className={"button-delete"} onClick={deleteActions}>delete</button>
            </AdminOnly>

            <NavLink to={`/checkup-actions/${props.action.id}`}>Details</NavLink>
        </div>
    )
}