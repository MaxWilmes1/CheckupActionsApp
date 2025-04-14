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
import {ManagedData} from "../../../models/managed_data/ManagedData.ts"
import {ManagedDataType} from "../../../models/managed_data/ManagedDataType.ts";

type Props = {
    type: ManagedDataType
}

// -------------------- Toolbar --------------------
function EditToolbar({onAddClick}: Readonly<{ onAddClick: () => void }>) {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={onAddClick}>
                Add new
            </Button>
        </GridToolbarContainer>
    );
}

// -------------------- Component --------------------
export default function DataForm(props: Readonly<Props>) {
    const [data, setData] = useState<ManagedData[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const type = props.type

    useEffect(() => {
        axios.get<ManagedData[]>("/api/managedData")
            .then(r => setData(
                r.data.filter(data => data.type === type)
            ))
            .catch(e => console.error(`Error fetching ${type.toLowerCase()}`, e));
    }, [type]);

    const handleAddClick = () => {
        const id = randomId();
        const newRow: ManagedData = {id, type: type, info: "", isNew: true};
        setData(prev => [...prev, newRow]);
        setRowModesModel(prev => ({
            ...prev,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: "info"}
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

    const processRowUpdate = async (newRow: ManagedData) => {
        const updatedRow = {...newRow};

        if (newRow.isNew) {
            axios.post("/api/managedData", {info: newRow.info, type: type})
                .then(r => {
                    console.log(`New ${type.toLowerCase()} added`, r.data)
                })
                .catch(e => {
                    console.error(`Error adding new ${type.toLowerCase()} `, e)
                })
            return newRow
        } else {
            axios.put(`/api/managedData/${newRow.id}`, updatedRow)
                .then(r => {
                    console.log(`${type.toLowerCase()} updated successfully`, r.data)
                })
                .catch(e => {
                    console.error(`Error updating ${type.toLowerCase()}`, e)
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
        axios.delete(`/api/managedData/${id}`)
            .then(() => {
                setData(prev => prev.filter(row => row.id !== id));
            })
            .catch(e => {
                console.error(`Error deleting ${type.toLowerCase()}`, e)
            })
    };

    const columns: GridColDef[] = [
        {field: "info", headerName: `${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()}`, width: 200, editable: true},
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem key={`save-${id}`} icon={<SaveIcon/>} label="Save" onClick={handleSaveClick(id)}/>,
                        <GridActionsCellItem key={`cancel-${id}`} icon={<CancelIcon/>} label="Cancel" onClick={handleCancelClick(id)}/>,
                    ];
                }

                return [
                    <GridActionsCellItem key={`edit-${id}`} icon={<EditIcon/>} label="Edit" onClick={handleEditClick(id)}/>,
                    <GridActionsCellItem key={`delete-${id}`} icon={<DeleteIcon/>} label="Delete" onClick={handleDeleteClick(id)}/>,
                ];
            }
        }
    ];

    return (
        <Box sx={{height: 500, width: "100%"}}>
            <DataGrid
                rows={data}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: () => <EditToolbar onAddClick={handleAddClick}/>
                }}
                sx={{
                    boxShadow: 4,
                    border: 2,
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#eceff1',
                        color: '#263238',
                        fontWeight: 'bold',
                        fontSize: 16
                    }
                }}
            />
        </Box>
    );
}
