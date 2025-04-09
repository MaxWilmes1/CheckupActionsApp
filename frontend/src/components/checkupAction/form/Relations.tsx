import {ChangeEvent} from 'react';
import {Box, SelectChangeEvent, Typography} from "@mui/material";
import ManagedDataForm from "./components/ManagedDataForm.tsx";
import {ManagedData} from "../../../models/managed_data/ManagedData.ts";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Relations(props: Props) {
    const arts = props.managedData.filter(o => o.type === "ART")
    const adus = props.managedData.filter(o => o.type === "ADU")
    const applications = props.managedData.filter(o => o.type === "APPLICATION")
    const cinums = props.managedData.filter(o => o.type === "CINUM")

    return (
        <Box sx={{display: "flex", flexDirection: "column", marginBottom: 0.5}}>
            <Typography variant="subtitle1" sx={{marginBottom: 0.5}}>
                Relations
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        borderRadius: 2,
                    }}
                >
                    <ManagedDataForm
                        action={props.action}
                        managedData={arts}
                        type={"ART"}
                        onChange={props.onChange}
                    />
                    <ManagedDataForm
                        action={props.action}
                        managedData={adus}
                        type={"ADU"}
                        onChange={props.onChange}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        borderRadius: 2,
                    }}
                >
                    <ManagedDataForm
                        action={props.action}
                        managedData={applications}
                        type={"APPLICATION"}
                        onChange={props.onChange}
                    />
                    <ManagedDataForm
                        action={props.action}
                        managedData={cinums}
                        type={"CINUM"}
                        onChange={props.onChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}
