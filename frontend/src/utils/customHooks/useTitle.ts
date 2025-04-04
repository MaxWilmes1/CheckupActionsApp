import {useEffect, useState} from "react";
import {Title} from "../../models/title/Title.ts";
import axios from "axios";

export function useTitle() {
    const [titles, setTitles] = useState<Title[]>([])

    useEffect(() => {
        axios.get("/api/user")
            .then(r => {
                setTitles(r.data)
            })
    }, []);

    return titles;
}