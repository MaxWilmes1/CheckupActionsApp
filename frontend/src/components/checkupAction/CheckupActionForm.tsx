import {ChangeEvent, FormEvent} from "react";
import {SelectChangeEvent, Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {ManagedData} from "../../models/managed_data/ManagedData.ts"
import ManagedDataForm from "./ManagedDataForm.tsx";
import DescriptionForm from "./DescriptionForm.tsx";
import ResponsibilityForm from "./ResponsibilityForm.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function CheckupActionForm(props: Readonly<Props>) {
    const titles = props.managedData.filter(o => o.type === "TITLE")
    const subtitles = props.managedData.filter(o => o.type === "SUBTITLE")
    const arts = props.managedData.filter(o => o.type === "ART")
    const adus = props.managedData.filter(o => o.type === "ADU")
    const applications = props.managedData.filter(o => o.type === "APPLICATION")
    const cinums = props.managedData.filter(o => o.type === "CINUM")
    const pis = props.managedData.filter(o => o.type === "PI")

    return (
        <Box sx={{marginTop: 2}}>
            <form onSubmit={props.onSubmit} style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                <ManagedDataForm action={props.action} managedData={titles} type={"TITLE"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={subtitles} type={"SUBTITLE"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={arts} type={"ART"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={adus} type={"ADU"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={applications} type={"APPLICATION"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={cinums} type={"CINUM"} onChange={props.onChange}/>
                <ManagedDataForm action={props.action} managedData={pis} type={"PI"} onChange={props.onChange}/>
                <ResponsibilityForm action={props.action} onChange={props.onChange}/>
                <DescriptionForm action={props.action} onChange={props.onChange}/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size={"small"}
                    sx={{alignSelf: "flex-end"}}
                >
                    <SaveIcon/>
                </Button>
            </form>
        </Box>
    );
}
