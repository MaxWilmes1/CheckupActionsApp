import {Title} from "../../../models/title/Title.ts";
import axios from "axios";
import {FormEvent, useState} from "react";

type Props = {
    title: Title;
    fetchTitles: () => void;
};

export default function TitleCard(props: Readonly<Props>) {
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title.title);

    const deleteTitle = () => {
        axios.delete("/api/title/" + props.title.id)
            .then(() => props.fetchTitles())
            .catch(e => console.error("Error deleting title", e));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put("/api/title/" + props.title.id, { title: updatedTitle })
            .then(() => {
                setEditMode(false);
                props.fetchTitles();
            })
            .catch(e => console.error("Error updating title", e));
    };

    return (
        <div className="card">
            {editMode ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <button className="button-save">Save</button>
                    </form>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p>{props.title.title}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={deleteTitle} className="button-delete">Delete</button>
                </>
            )}
        </div>
    );
}
