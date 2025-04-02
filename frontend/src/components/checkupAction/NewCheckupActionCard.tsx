import { FormEvent, useState } from 'react';
import axios from "axios";
import { NewCheckupAction } from "../../models/checkupAction/NewCheckupAction.ts";
import { useTitle } from "../../utils/useTitle.ts";
import { Title } from "../../models/title/Title.ts";
import { Paper } from "@mui/material";

type Props = {
    fetchActions: () => void;
};

export default function NewCheckupActionCard(props: Readonly<Props>) {
    const titles: Title[] = useTitle();
    const [newAction, setNewAction] = useState<NewCheckupAction>({ title: "" });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newAction.title) {
            alert("Bitte einen Titel auswählen!");
            return;
        }

        axios.post("/api/checkup-actions", newAction)
            .then(props.fetchActions)
            .catch(e => console.error("Error saving action:", e));

        setNewAction({ title: "" });
    };

    return (
        <Paper elevation={4}>
            <form onSubmit={handleSubmit}>
                <select
                    value={newAction.title}
                    onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                >
                    <option value="">-- Bitte wählen --</option>
                    {titles.map(title => (
                        <option key={title.id} value={title.title}>{title.title}</option>
                    ))}
                </select>
                <button className="button-save">Save</button>
            </form>
        </Paper>
    );
}
