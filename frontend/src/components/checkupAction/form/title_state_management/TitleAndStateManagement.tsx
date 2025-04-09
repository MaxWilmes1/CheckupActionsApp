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
};

export default function TitleAndStateManagement(props: Props) {
    return (
        <Box>
            <Box sx={{marginBottom: 1}}>
                <StateManagement action={props.action} onChange={props.onChange}/>
            </Box>

            <Divider/>
            <Box sx={{width: "50%", marginTop: 2}}>
                <Title action={props.action} managedData={props.managedData} onChange={props.onChange}/>
            </Box>
        </Box>
    );
}
