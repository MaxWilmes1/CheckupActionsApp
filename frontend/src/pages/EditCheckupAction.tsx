import {NavLink, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {NewCheckupAction} from "../models/NewCheckupAction.ts";
import axios from "axios";
import {useIsAdmin} from "../utils/useAdmin.ts";
import AdminOnly from "../utils/AdminOnly.tsx";

export default function EditCheckupAction() {
    const params = useParams()
    const [action, setAction] = useState<NewCheckupAction>()
    const navigate = useNavigate()
    const isAdmin = useIsAdmin()

    useEffect(() => {
        axios.get(`/api/checkup-actions/${params.id}`)
            .then(r => {
                setAction(r.data);
            })
            .catch(error => console.error("Error loading checkup action with id:" + params.id, error));
    }, [params.id]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put(`/api/checkup-actions/${params.id}`, action)
            .then(() =>
                console.log(action)
            )
        navigate("/checkup-actions")
    }

    if (!action) {
        return "Loading..."
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type={"text"}
                value={action.title}
                onChange={e => setAction({...action, title: e.target.value})}
                disabled={!isAdmin}
            />
            <AdminOnly>
                <button className={"button-save"}>Update</button>
            </AdminOnly>
            <NavLink to={"/"}>Home</NavLink>
        </form>
    );
}