import {FormEvent} from "react";
import {SelectChangeEvent, Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {Data} from "../../models/data/Data.ts"
import TitleForm from "./TitleForm.tsx";
import SubTitleForm from "./SubTitleForm.tsx";
import ArtForm from "./ArtForm.tsx";
import AduForm from "./AduForm.tsx";
import ApplicationForm from "./ApplicationForm.tsx";
import CinumForm from "./CinumForm.tsx";
import PiForm from "./PiForm.tsx";

type Props = {
    action: CheckupAction;
    data: Data[];
    onChange: (event: SelectChangeEvent) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function CheckupActionForm(props: Readonly<Props>) {
    const titles = props.data.filter(o => o.type === "TITLE")
    const subtitles = props.data.filter(o => o.type === "SUBTITLE")
    const arts = props.data.filter(o => o.type === "ART")
    const adus = props.data.filter(o => o.type === "ADU")
    const applications = props.data.filter(o => o.type === "APPLICATION")
    const cinums = props.data.filter(o => o.type === "CINUM")
    const pis = props.data.filter(o => o.type === "PI")

    return (
        <Box sx={{marginTop: 2}}>
            <form onSubmit={props.onSubmit} style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size={"small"}
                    sx={{alignSelf: "flex-start"}}
                >
                    <SaveIcon/>
                </Button>
                <TitleForm action={props.action} titles={titles} onChange={props.onChange}/>
                <SubTitleForm action={props.action} subtitles={subtitles} onChange={props.onChange}/>
                <ArtForm action={props.action} arts={arts} onChange={props.onChange}/>
                <AduForm action={props.action} adus={adus} onChange={props.onChange}/>
                <ApplicationForm action={props.action} applications={applications} onChange={props.onChange}/>
                <CinumForm action={props.action} cinums={cinums} onChange={props.onChange}/>
                <PiForm action={props.action} pis={pis} onChange={props.onChange}/>
            </form>
        </Box>
    );
}
