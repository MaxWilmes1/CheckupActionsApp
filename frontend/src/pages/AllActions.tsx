import {useEffect, useState} from 'react';
import CheckupActionCard from "../components/CheckupActionCard.tsx";
import NewCheckupActionCard from "../components/NewCheckupActionCard.tsx";
import {CheckupAction} from "../models/CheckupAction.ts";
import axios from "axios";
import {NavLink} from "react-router-dom";

function AllActions() {

    const [actions, setActions] = useState<CheckupAction[]>()

    useEffect(() => {
            fetchActions()
        }, []
    )

    const fetchActions = () => {
        axios.get("api/checkup-actions")
            .then(r => setActions(r.data))
            .catch(e => console.log("Error fetching actions", e))
    }

    if (!actions) {
        return "Loading..."
    }
    return (
        <>
            {
                actions.map((action) => (
                    <CheckupActionCard key={action.id} action={action} fetchActions={fetchActions}/>
                ))
            }
            <NewCheckupActionCard fetchActions={fetchActions}/>
            <NavLink to={"/"}>Home</NavLink>
        </>
    );
}

export default AllActions;