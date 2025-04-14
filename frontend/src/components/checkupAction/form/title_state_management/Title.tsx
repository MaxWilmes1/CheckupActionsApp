import {ChangeEvent} from 'react';
import {Box, SelectChangeEvent} from "@mui/material";
import ManagedDataForm from "../components/ManagedDataForm.tsx";
import {ManagedData} from "../../../../models/managed_data/ManagedData.ts";
import {CheckupAction} from "../../../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    managedData: ManagedData[];
    onChange: (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Title(props: Readonly<Props>) {
    const titles = props.managedData.filter(o => o.type === "TITLE")
    const subtitles = props.managedData.filter(o => o.type === "SUBTITLE")

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                width: "100%",
            }}
        >
            <ManagedDataForm
                action={props.action}
                managedData={titles}
                type={"TITLE"}
                onChange={props.onChange}
            />
            <ManagedDataForm
                action={props.action}
                managedData={subtitles}
                type={"SUBTITLE"}
                onChange={props.onChange}
            />
        </Box>
    );
}
