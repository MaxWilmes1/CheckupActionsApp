import {useEffect, useState} from "react";
import axios from "axios";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
    GridRowModes,
    GridRowModesModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";
import {Title} from "../../../models/title/Title.ts";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {randomId} from "@mui/x-data-grid-generator";

//#############
interface EditToolbarProps {
    setRows: React.Dispatch<React.SetStateAction<Title[]>>;
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

function EditToolbar({ setRows, setRowModesModel }: EditToolbarProps) {
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, title: "", isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

//#############

export default function ManageTitles() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        fetchTitles();
    }, []);

    const fetchTitles = () => {
        axios.get("/api/title")
            .then(response => {
                setTitles(response.data);
            })
            .catch(error => {
                console.error("Error fetching titles!", error);
            });
    };

    if (!titles) {
        return "Loading...";
    }

    const processRowUpdate = (newRow: Title & { isNew?: boolean }) => {
        const updatedRow = { ...newRow };
        if (newRow.isNew) {
            delete updatedRow.isNew; // nicht mit an die API schicken
            axios.post("/api/title", updatedRow)
                .then(response => {
                    console.log("Title created:", response.data);
                    setTitles(prev => prev.map(row =>
                        row.id === newRow.id ? response.data : row // Ersetze temp-ID durch echte vom Server
                    ));
                })
                .catch(error => {
                    console.error("Error creating title!", error);
                });
        } else {
            axios.put(`/api/title/${newRow.id}`, updatedRow)
                .then(response => {
                    console.log("Title updated:", response.data);
                })
                .catch(error => {
                    console.error("Error updating title!", error);
                });
        }

        // Direkt anzeigen im Grid (auch wenn async läuft)
        setTitles(prevTitles =>
            prevTitles.map(title =>
                title.id === newRow.id ? updatedRow : title
            )
        );

        return updatedRow;
    };


    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        axios.delete("/api/title/" + id)
            .then(r => {
                console.log("Title successfully deleted!", r)
            })
            .catch(e => {
                console.error("Error deleting title!", e)
            })
        setTitles(titles.filter(row => row.id !== id));
    };

    // Edit Mode Management
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true}
        });
    };

    const columns: GridColDef[] = [
        {field: "title", headerName: "Title", width: 180, editable: true},
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon/>} label="Save" onClick={handleSaveClick(id)}/>,
                        <GridActionsCellItem icon={<CancelIcon/>} label="Cancel" onClick={handleCancelClick(id)}/>
                    ];
                }
                return [
                    <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={handleEditClick(id)}/>,
                    <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" onClick={handleDeleteClick(id)}/>
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
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: {
                        setRows: setTitles,
                        setRowModesModel: setRowModesModel
                    }
                }}
            />

        </Box>
    );
}
