import {useEffect, useState} from "react";
import {ManagedData} from "../../models/managed_data/ManagedData.ts";
import axios from "axios";

export function useManagedData() {
    const [managedData, setManagedData] = useState<ManagedData[]>([])

    useEffect(() => {
        axios.get("/api/managedData")
            .then(r => setManagedData(r.data))
    }, []);

    return managedData;
}