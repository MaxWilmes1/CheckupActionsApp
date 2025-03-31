import {CheckupAction} from "../models/CheckupAction.ts";
import axios from "axios";
import {NavLink} from "react-router-dom";

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
            <button className={"button-delete"} onClick={deleteActions}>delete</button>
            <NavLink to={`/checkup-actions/${props.action.id}`}>Details</NavLink>
        </div>
    )
}