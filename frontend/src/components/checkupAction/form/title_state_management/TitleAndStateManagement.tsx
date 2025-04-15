import {ChangeEvent} from 'react';
import {Box, SelectChangeEvent} from "@mui/material";
import {ManagedData} from "../../../../models/managed_data/ManagedData.ts";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import Title from "./Title.tsx";
import StateManagement from "./StateManagement.tsx";
import Divider from "@mui/material/Divider";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isDetailsPage: boolean;
};

export default function TitleAndStateManagement(props: Readonly<Props>) {
    return (
        <Box>
            <Box sx={{marginBottom: "1rem"}}>
                <StateManagement action={props.action} onChange={props.onChange} isDetailsPage={props.isDetailsPage}/>
            </Box>
            <Divider sx={{marginBottom: 1, borderBottomWidth: 1, borderColor: "primary.main"}}/>
            <Box sx={{width: "50%", marginTop: "1rem", marginBottom: "1rem"}}>
                <Title action={props.action} managedData={props.managedData} onChange={props.onChange}/>
            </Box>
        </Box>
    );
}