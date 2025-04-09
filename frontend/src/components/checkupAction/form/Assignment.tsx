import {ChangeEvent} from 'react';
import {Box, SelectChangeEvent, Typography} from "@mui/material";
import ManagedDataForm from "./components/ManagedDataForm.tsx";
import {ManagedData} from "../../../models/managed_data/ManagedData.ts";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import ResponsibilityForm from "./components/ResponsibilityForm.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Assignment(props: Props) {
    const pis = props.managedData.filter(o => o.type === "PI")

    return (
        <Box>
            <Typography variant="subtitle1" sx={{marginBottom: 0.5}}>
                Assignment
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    borderRadius: 2,
                    marginBottom: 2,
                }}
            >
                <ManagedDataForm
                    action={props.action}
                    managedData={pis}
                    type={"PI"}
                    onChange={props.onChange}
                />
                <ResponsibilityForm action={props.action} onChange={props.onChange}/>
            </Box>
        </Box>

    );
}


