import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NewCheckupAction} from "../models/NewCheckupAction.ts";
import axios from "axios";

export default function CheckupActionDetails() {
    const params = useParams()
    const [action, setAction] = useState<NewCheckupAction>()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/api/checkup-actions/${params.id}`)
            .then(r => {
                setAction(r.data);
            })
            .catch(error => console.error("Fehler beim Laden:", error));
    }, [params.id]);

    const updateAction = () => {
        axios.put(`/api/checkup-actions/update/${params.id}`, action)
            .then(() =>
                console.log(action)
            )
        navigate("/")

    }

    if (!action) {
        return "Loading..."
    }

    return (
        <form onSubmit={updateAction}>
            <input type={"text"} value={action.title} onChange={e => setAction({...action, title: e.target.value})}/>
            <button className={"button-save"}>Update</button>
            <NavLink to={"/"}>Home</NavLink>
        </form>
    );
}