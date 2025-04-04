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
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
        // Aktualisiere den State mit den neuen Werten
        setUsers(prevUsers => prevUsers.map(user => user.id === newRow.id ? newRow : user));

        // Sende die aktualisierten Daten an die API
        axios.put(`/api/user/${newRow.id}`, newRow)
            .then(response => {
                console.log("User updated:", response.data);
            })
            .catch(error => {
                console.error("Error updating user!", error);
            });

        return newRow; // Muss zurückgegeben werden, damit DataGrid die Änderung übernimmt
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    // const handleDeleteClick = (id: GridRowId) => () => {
    //     setUsers(users.filter(row => row.id !== id));
    // };

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
                        <GridActionsCellItem icon={<SaveIcon/>} label="Save" onClick={handleSaveClick(id)}/>,
                        <GridActionsCellItem icon={<CancelIcon/>} label="Cancel" onClick={handleCancelClick(id)}/>
                    ];
                }
                return [
                    <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={handleEditClick(id)}/>,
                    // <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" onClick={handleDeleteClick(id)}/>
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
            />
        </Box>
    );
}
