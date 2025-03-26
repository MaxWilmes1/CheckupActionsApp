import {CheckupAction} from "../models/CheckupAction.ts";
import axios from "axios";

type Props = {
    action: CheckupAction
    fetchActions: () => void
};

export default function CheckupActionCard(props: Props) {

    const deleteActions = () => {
        axios.delete(`api/checkup-actions/delete/${props.action.id}`)
            .then(props.fetchActions)
    }

    return (
        <div className={"checkup-action-card"}>
            <p>{props.action.title}</p>
            <button className={"button-delete"} onClick={deleteActions}>delete</button>
        </div>
    )
}