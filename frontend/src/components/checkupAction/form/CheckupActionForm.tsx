import {ChangeEvent, FormEvent, useState} from "react";
import {SelectChangeEvent, Box} from "@mui/material";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {ManagedData} from "../../../models/managed_data/ManagedData.ts"
import DescriptionForm from "./components/DescriptionForm.tsx";
import Divider from "@mui/material/Divider";
import Relations from "./Relations.tsx";
import Assignment from "./Assignment.tsx";
import TitleAndStateManagement from "./title_state_management/TitleAndStateManagement.tsx";
import CommentDrawer from "../commentSection/CommentDrawer.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function CheckupActionForm(props: Readonly<Props>) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 0.5}}>
            <form onSubmit={props.onSubmit} style={{display: "flex", flexDirection: "row"}}>
                <Box sx={{width: "97%"}}>
                    <TitleAndStateManagement action={props.action} managedData={props.managedData}
                                             onChange={props.onChange}/>
                    <Divider sx={{marginBottom: 1}}/>
                    <Relations action={props.action} managedData={props.managedData}
                               onChange={props.onChange}/>
                    <Divider sx={{marginBottom: 1}}/>

                    <Assignment action={props.action} managedData={props.managedData} onChange={props.onChange}/>
                    <Divider sx={{marginBottom: 1}}/>
                    <DescriptionForm action={props.action} onChange={props.onChange}/>
                </Box>
                <Divider orientation={"vertical"} flexItem/>
                <Box
                    sx={{
                        width: isDrawerOpen ? "35%" : "3%",
                        backgroundColor: 'lightgray',
                        display: 'flex',
                        alignItems: 'flex-start',
                        overflow: 'hidden',
                        transition: 'width 0.3s ease-in-out',
                    }}
                >
                    <CommentDrawer
                        open={isDrawerOpen}
                        onOpen={() => setIsDrawerOpen(true)}
                        onClose={() => setIsDrawerOpen(false)}
                        action={props.action}
                        onChange={props.onChange}
                    />
                </Box>
            </form>
        </Box>
    )
}