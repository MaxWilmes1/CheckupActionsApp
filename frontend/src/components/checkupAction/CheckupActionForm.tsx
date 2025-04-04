import {FormEvent} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {Title} from "../../models/title/Title.ts";
import {CheckupAction} from "../../models/checkupAction/CheckupAction.ts";

type Props = {
    action: CheckupAction;
    titles: Title[];
    onChange: (event: SelectChangeEvent) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function CheckupActionForm(props: Props) {
    return (
        <Box sx={{ marginTop: 2 }}>
            <form onSubmit={props.onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size={"small"}
                    sx={{ alignSelf: "flex-start" }}
                >
                    <SaveIcon />
                </Button>

                <FormControl
                    variant="standard"
                    sx={{
                        p: 1,
                        width: "50%",
                        backgroundColor: "#fff",
                        borderRadius: 1
                    }}
                >
                    <InputLabel>Title</InputLabel>
                    <Select value={props.action.title} onChange={props.onChange}>
                        {props.titles.map(title => (
                            <MenuItem key={title.id} value={title.title}>
                                {title.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        </Box>
    );
}
