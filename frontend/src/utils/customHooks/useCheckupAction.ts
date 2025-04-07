import { useEffect, useState } from "react";
import axios from "axios";
import { CheckupAction } from "../../models/checkupAction/CheckupAction.ts";

const defaultCheckupAction: CheckupAction = {
    id: "",
    title: "",
    subtitle: "",
    art: "",
    adu: "",
    application: "",
    cinum: "",
    pi: "",
};

export function useCheckupAction(id?: string) {
    const [action, setAction] = useState<CheckupAction | null>(id ? null : defaultCheckupAction);

    useEffect(() => {
        if (id) {
            axios.get(`/api/checkup-actions/${id}`)
                .then(response => setAction(response.data))
                .catch(error => console.error("Error loading checkup action:", error));
        }
    }, [id]);

    return { action, setAction };
}
