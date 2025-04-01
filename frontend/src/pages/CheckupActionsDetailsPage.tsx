import {NavLink, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {NewCheckupAction} from "../models/checkupAction/NewCheckupAction.ts";
import axios from "axios";
import {useIsAdmin} from "../utils/useAdmin.ts";
import AdminOnly from "../utils/AdminOnly.tsx";
import {useTitle} from "../utils/useTitle.ts";
import {Title} from "../models/title/Title.ts";

export default function CheckupActionsDetailsPage() {
    const params = useParams()
    const [action, setAction] = useState<NewCheckupAction>()
    const navigate = useNavigate()
    const isAdmin: boolean = useIsAdmin()
    const titles: Title[] = useTitle()

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
            <select
                value={action.title}
                onChange={e => setAction({...action, title: e.target.value})}
                disabled={!isAdmin}
            >
                {
                    titles.map(title => (
                        <option key={title.id} value={title.title}>{title.title}</option>
                    ))
                }
            </select>
            <AdminOnly>
                <button className={"button-save"}>Update</button>
            </AdminOnly>
            <NavLink to={"/checkup-actions"}>Checkup-Actions Dashboard</NavLink>
        </form>
    );
}