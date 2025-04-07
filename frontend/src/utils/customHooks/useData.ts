import {useEffect, useState} from "react";
import {Data} from "../../models/data/Data.ts";
import axios from "axios";

export function useData() {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        axios.get("/api/data")
            .then(r => setData(r.data))
    }, []);

    return data;
}