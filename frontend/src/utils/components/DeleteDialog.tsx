import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    item: string;
    open: boolean;
    handleDelete: () => void;
    handleClose: () => void;
};

export default function DeleteDialog(props: Readonly<Props>) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete " + props.item}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this {props.item}? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>cancel</Button>
                <Button variant="contained" color="error" onClick={props.handleDelete} autoFocus>
                    delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
