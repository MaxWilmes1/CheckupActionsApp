import {useEffect, useState} from "react";
import axios from "axios";
import {AppUser} from "../../../models/appUser/AppUser.ts";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
    GridRowModes,
    GridRowModesModel
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";

export default function ManageUsers() {
    const [users, setUsers] = useState<AppUser[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const roles = ['NONE', 'USER', 'ADMIN']

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("/api/user")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users!", error);
            });
    };

    if (!users) {
        return "Loading...";
    }

    // API-Requests
    const processRowUpdate = (newRow: AppUser) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === newRow.id ? newRow : user));

        axios.put(`/api/user/${newRow.id}`, newRow)
            .then(response => {
                console.log("User updated:", response.data);
            })
            .catch(error => {
                console.error("Error updating user!", error);
            });

        return newRow;
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        axios.delete(`/api/user/${id}`)
            .then(() => {
                setUsers(users.filter(row => row.id !== id));
            })
            .catch(e => {
                console.error("Error deleting user",e)
            })
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
        {field: "username", headerName: "Name", width: 180, editable: false},
        {field: "id", headerName: "ID", width: 140, editable: false},
        {
            field: "role",
            headerName: "Role",
            width: 130, align: "left",
            headerAlign: "left",
            editable: true,
            type: "singleSelect",
            valueOptions: roles,
        },
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
                        <GridActionsCellItem key={`save-${id}`} icon={<SaveIcon/>} label="Save" onClick={handleSaveClick(id)}/>,
                        <GridActionsCellItem key={`cancel-${id}`} icon={<CancelIcon/>} label="Cancel" onClick={handleCancelClick(id)}/>
                    ];
                }
                return [
                    <GridActionsCellItem key={`edit-${id}`} icon={<EditIcon/>} label="Edit" onClick={handleEditClick(id)}/>,
                    <GridActionsCellItem key={`delete-${id}`} icon={<DeleteIcon/>} label="Delete" onClick={handleDeleteClick(id)}/>
                ];
            }
        }
    ];

    return (
        <Box sx={{height: 500, width: "100%"}}>
            <DataGrid
                rows={users}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{toolbar: GridToolbarContainer}}
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
