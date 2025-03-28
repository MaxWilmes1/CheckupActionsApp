import {FormEvent, useState} from 'react';
import axios from "axios";
import {NewCheckupAction} from "../models/NewCheckupAction.ts";

type Props = {
    fetchActions: () => void
}

export default function NewCheckupActionCard(props: Readonly<Props>) {
    const [newAction, setNewAction] = useState<NewCheckupAction>()

    const saveAction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("api/checkup-actions", newAction)
            .then(props.fetchActions)
        setNewAction({title:""})
    }

    return (
        <form onSubmit={saveAction}>
            <input type={"text"}
                   placeholder={"title"}
                   value={newAction?.title}
                   onChange={(e) =>
                       setNewAction({...newAction, title: e.target.value})
                   }
            />
            <button className={"button-save"}>Save</button>
        </form>
    );
}