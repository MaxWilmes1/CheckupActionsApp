import {ChangeEvent} from 'react';
import {Box, SelectChangeEvent} from "@mui/material";
import {ManagedData} from "../../../../models/managed_data/ManagedData.ts";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";
import Title from "./Title.tsx";
import StateManagement from "./StateManagement.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function TitleAndStateManagement(props: Props) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 0.5,
            }}
        >
            <Title action={props.action} managedData={props.managedData}
                   onChange={props.onChange}/>
            <StateManagement/>
        </Box>
    );
}
