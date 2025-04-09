import {ChangeEvent, FormEvent} from "react";
import {SelectChangeEvent, Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";
import {ManagedData} from "../../models/managed_data/ManagedData.ts"
import ManagedDataForm from "./ManagedDataForm.tsx";
import DescriptionForm from "./DescriptionForm.tsx";
import ResponsibilityForm from "./ResponsibilityForm.tsx";
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";

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
        <Box sx={{display: "flex", flexDirection: "column", padding: 2}}>
            <form onSubmit={props.onSubmit} style={{display: "flex", flexDirection: "column"}}>
                <Box>
                    {/* Titles and subtitles and State Management */}<Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 0.5,
                    }}
                >
                    {/* Titles and subtitles */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent:"space-between",
                            borderRadius: 2,
                            width: "50%",
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
                    {/* Save Button */}
                    <Box
                        sx={{
                            marginLeft: 2,
                            display: "flex",
                            flexDirection:"column",
                            alignItems:"flex-end",
                            width: "50%",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            size={"medium"}
                        >
                            <SaveIcon/>
                        </Button>
                    </Box>
                </Box>

                    {/* ARTs, ADUs, Applications, and CINUMs */}
                    <Divider sx={{marginBottom: 1}}/>
                    <Box sx={{display: "flex", flexDirection: "column", marginBottom: 0.5}}>
                        <Typography variant="subtitle1" sx={{marginBottom: 0.5}}>
                            Relations
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "row"}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "50%",
                                    borderRadius: 2,
                                }}
                            >
                                <ManagedDataForm
                                    action={props.action}
                                    managedData={arts}
                                    type={"ART"}
                                    onChange={props.onChange}
                                />
                                <ManagedDataForm
                                    action={props.action}
                                    managedData={adus}
                                    type={"ADU"}
                                    onChange={props.onChange}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "50%",
                                    borderRadius: 2,
                                }}
                            >
                                <ManagedDataForm
                                    action={props.action}
                                    managedData={applications}
                                    type={"APPLICATION"}
                                    onChange={props.onChange}
                                />
                                <ManagedDataForm
                                    action={props.action}
                                    managedData={cinums}
                                    type={"CINUM"}
                                    onChange={props.onChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{marginBottom: 1}}/>

                    {/* PIs and Responsibilities */}
                    <Typography variant="subtitle1" sx={{marginBottom: 0.5}}>
                        State
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
                <DescriptionForm action={props.action} onChange={props.onChange}/>
            </form>
        </Box>
    )
}
