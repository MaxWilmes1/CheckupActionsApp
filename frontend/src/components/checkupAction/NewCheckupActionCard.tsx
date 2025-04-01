import {FormEvent, useState} from 'react';
import axios from "axios";
import {NewCheckupAction} from "../../models/checkupAction/NewCheckupAction.ts";
import {useTitle} from "../../utils/useTitle.ts";
import {Title} from "../../models/title/Title.ts";

type Props = {
    fetchActions: () => void
}

export default function NewCheckupActionCard(props: Readonly<Props>) {
    const [newAction, setNewAction] = useState<NewCheckupAction>()
    const titles: Title[] = useTitle()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("/api/checkup-actions", newAction)
            .then(props.fetchActions)
            .catch(e => console.error("Error saving action:", e));
        setNewAction({title: ""})
    }

    return (
        <form onSubmit={handleSubmit}>
            <select
                value={newAction?.title}
                onChange={(e) =>
                    setNewAction({...newAction, title: e.target.value})
                }
            >
                {
                    titles.map(title => (
                        <option key={title.id} value={title.title}> {title.title}</option>
                    ))
                }
            </select>
            <button className={"button-save"}>Save</button>
        </form>
    );
}