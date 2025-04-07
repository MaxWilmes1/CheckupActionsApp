import {useEffect, useState} from "react";
import axios from "axios";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {randomId} from "@mui/x-data-grid-generator";
import {Title} from "../../../models/title/Title.ts"

// -------------------- Toolbar --------------------
function EditToolbar({onAddClick}: { onAddClick: () => void }) {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={onAddClick}>
                Add new
            </Button>
        </GridToolbarContainer>
    );
}

// -------------------- Component --------------------
export default function ManageTitles() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        axios.get<Title[]>("/api/title")
            .then(r => setTitles(r.data))
            .catch(e => console.error("Error fetching titles", e));
    }, []);

    const handleAddClick = () => {
        const id = randomId();
        const newRow: Title = {id, title: "", isNew: true};
        setTitles(prev => [...prev, newRow]);
        setRowModesModel(prev => ({
            ...prev,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: "title"}
        }));
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleRowModesModelChange = (model: GridRowModesModel) => {
        setRowModesModel(model);
    };

    const processRowUpdate = async (newRow: Title) => {
        const updatedRow = {...newRow};

        if (newRow.isNew) {
            axios.post("/api/title", {title: newRow.title})
                .then(r => {
                    console.log("New title added", r.data)
                })
                .catch(e => {
                    console.error("Error adding new title", e)
                })
            return newRow
        } else {
                 axios.put(`/api/title/${newRow.id}`, updatedRow)
                     .then(r => {
                         console.log("title updated successfully", r.data)
                     })
                     .catch(e => {
                         console.error("Error updating title", e)
                     })
                return updatedRow
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel(prev => ({
            ...prev,
            [id]: {mode: GridRowModes.Edit}
        }));
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel(prev => ({
            ...prev,
            [id]: {mode: GridRowModes.View}
        }));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel(prev => ({
            ...prev,
            [id]: {mode: GridRowModes.View, ignoreModifications: true}
        }));
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        axios.delete(`/api/title/${id}`)
            .then(() => {
                setTitles(prev => prev.filter(row => row.id !== id));
            })
            .catch(e => {
                console.error("Error deleting title", e)
            })
    };

    const columns: GridColDef[] = [
        {field: "title", headerName: "Title", width: 200, editable: true},
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon/>} label="Save" onClick={handleSaveClick(id)}/>,
                        <GridActionsCellItem icon={<CancelIcon/>} label="Cancel" onClick={handleCancelClick(id)}/>,
                    ];
                }

                return [
                    <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={handleEditClick(id)}/>,
                    <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" onClick={handleDeleteClick(id)}/>,
                ];
            }
        }
    ];

    return (
        <Box sx={{height: 500, width: "100%"}}>
            <DataGrid
                rows={titles}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: () => <EditToolbar onAddClick={handleAddClick}/>
                }}
            />
        </Box>
    );
}
