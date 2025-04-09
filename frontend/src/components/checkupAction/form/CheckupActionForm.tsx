import {ChangeEvent, FormEvent} from "react";
import {SelectChangeEvent, Box} from "@mui/material";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {ManagedData} from "../../../models/managed_data/ManagedData.ts"
import DescriptionForm from "./components/DescriptionForm.tsx";
import Divider from "@mui/material/Divider";
import Relations from "./Relations.tsx";
import Assignment from "./Assignment.tsx";
import TitleAndStateManagement from "./title_state_management/TitleAndStateManagement.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function CheckupActionForm(props: Readonly<Props>) {

    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 2}}>
            <form onSubmit={props.onSubmit} style={{display: "flex", flexDirection: "column"}}>
                <TitleAndStateManagement action={props.action} managedData={props.managedData}
                                         onChange={props.onChange}/>
                <Divider sx={{marginBottom: 1}}/>
                <Relations action={props.action} managedData={props.managedData}
                           onChange={props.onChange}/>
                <Divider sx={{marginBottom: 1}}/>

                <Assignment action={props.action} managedData={props.managedData} onChange={props.onChange}/>

                <DescriptionForm action={props.action} onChange={props.onChange}/>
            </form>
        </Box>
    )
}