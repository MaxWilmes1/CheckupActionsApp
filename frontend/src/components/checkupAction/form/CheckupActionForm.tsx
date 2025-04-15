import {ChangeEvent, FormEvent, useState} from "react";
import {SelectChangeEvent, Box} from "@mui/material";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";
import {ManagedData} from "../../../models/managed_data/ManagedData.ts"
import DescriptionForm from "./components/DescriptionForm.tsx";
import Divider from "@mui/material/Divider";
import Relations from "./relations/Relations.tsx";
import Assignment from "./assignment/Assignment.tsx";
import TitleAndStateManagement from "./title_state_management/TitleAndStateManagement.tsx";
import CommentDrawer from "../commentSection/CommentDrawer.tsx";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isDetailsPage: boolean;
};

export default function CheckupActionForm(props: Readonly<Props>) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            fontSize: {
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem',
                lg: '1.1rem',
                xl: '1.2rem',
            },
            p: {
                xs: 1,
                sm: 1.5,
                md: 2,
                lg: 2.5,
            }
        }}
        >
            <form
                onSubmit={props.onSubmit}
                style={{display: "flex", flexDirection: "row", height: "100%", width: "100%"}}>
                <Box sx={{
                    width: props.isDetailsPage
                        ? "97%"
                        : "100%",
                    mr: "1%"
                }}
                >
                    <TitleAndStateManagement action={props.action} managedData={props.managedData}
                                             onChange={props.onChange} isDetailsPage={props.isDetailsPage}/>
                    <Divider sx={{marginBottom: 1, borderBottomWidth: 1, borderColor: "primary.main"}}/>
                    <Relations action={props.action} managedData={props.managedData}
                               onChange={props.onChange}/>
                    <Divider sx={{marginBottom: 1, borderBottomWidth: 1, borderColor: "primary.main"}}/>

                    <Assignment action={props.action} managedData={props.managedData} onChange={props.onChange}/>
                    <Divider sx={{marginBottom: 1, borderBottomWidth: 1, borderColor: "primary.main"}}/>
                    <DescriptionForm action={props.action} onChange={props.onChange}/>
                </Box>
                {
                    props.isDetailsPage && <>
                        <Divider orientation={"vertical"} flexItem/>
                        <Box
                            sx={{
                                width: isDrawerOpen ? "50%" : "3%",
                                display: 'flex',
                                overflow: 'hidden',
                                alignItems: 'flex-start',
                                transition: 'width 0.15s ease-in-out'
                            }}
                        >
                            <CommentDrawer
                                open={isDrawerOpen}
                                onOpen={() => setIsDrawerOpen(true)}
                                onClose={() => setIsDrawerOpen(false)}
                                action={props.action}
                                onChange={props.onChange}/>
                        </Box>
                    </>
                }
            </form>
        </Box>
    )
}