import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import TitleCard from "./TitleCard.tsx";
import {Title} from "../../../models/title/Title.ts";
import {NewTitle} from "../../../models/title/NewTitle.ts";

export default function ManageTitles() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [newTitle, setNewTitle] = useState<NewTitle>({title: ""});

    useEffect(() => {
        fetchTitles();
    }, []);

    const fetchTitles = () => {
        axios.get("/api/title")
            .then(r => {
                setTitles(r.data)
            })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("/api/title", newTitle)
            .then(() => {
                console.log(newTitle)
                fetchTitles()
                setNewTitle({ title: "" });
            })
    }

    return (
        <div>
            <h3>Manage Titles</h3>
            {
                titles.map(title => (
                        <TitleCard key={title.id} title={title} fetchTitles={fetchTitles}/>
                    )
                )
            }
            <form onSubmit={handleSubmit}>
                <input type={"text"}
                       placeholder={"Enter new title"}
                       value={newTitle?.title}
                       onChange={e => setNewTitle({title: e.target.value})}/>
                <button className={"button-save"}>Save</button>
            </form>
        </div>
    );
}
