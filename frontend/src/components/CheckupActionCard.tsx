import {CheckupAction} from "../models/CheckupAction.ts";

type Props = {
    action: CheckupAction
};

export default function CheckupActionCard(props: Props) {
    return (
        <div className={"checkup-action-card"}>
            <p>{props.action.title}</p>
            <button>delete</button>
        </div>
    )
}