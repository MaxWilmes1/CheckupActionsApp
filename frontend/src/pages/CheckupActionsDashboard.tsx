import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {CheckupAction} from "../models/checkupAction/CheckupAction.ts";
import AdminOnly from "../utils/components/AdminOnly.tsx";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";

export default function CheckupActionsDashboard() {
    const [data, setData] = useState<CheckupAction[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/api/checkup-actions")
            .then(r => {
                setData(r.data);
            })
            .catch(error => {
                console.error("Error fetching data", error);
            });
    };

    const handleDelete = (id: string) => {
        axios.delete(`/api/checkup-actions/${id}`)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error("Error deleting item", error);
            });
    };

    const rows: GridRowsProp = data.map((item) => ({
        id: item.id,
        status: item.status,
        title: item.title,
        subtitle: item.subtitle,
        art: item.art,
        adu: item.adu,
        application: item.application,
        cinum: item.cinum,
        pi: item.pi,
        dateCreated: item.dateCreated ? dayjs(item.dateCreated).format("DD.MM.YYYY HH:mm") : "",
        dateLastEdit: item.dateLastEdit ? dayjs(item.dateLastEdit).format("DD.MM.YYYY HH:mm") : ""
    }));

    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 110,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <AdminOnly>
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleDelete(params.row.id)}
                    />
                    <NavLink to={`/checkup-actions/${params.row.id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </NavLink>
                </AdminOnly>
            )
        },
        {field: "status", headerName: "Status", width: 90},
        {field: "pi", headerName: "PI", width: 90},
        {field: "dateCreated", headerName: "Created", width: 150},
        {field: "dateLastEdit", headerName: "Last Edit", width: 150},
        {field: "title", headerName: "Title", width: 170},
        {field: "subtitle", headerName: "Sub-Title", width: 170},
        {field: "art", headerName: "ART", width: 150},
        {field: "adu", headerName: "ADU", width: 150},
        {field: "application", headerName: "App", width: 170},
        {field: "cinum", headerName: "CINUM", width: 140},
    ];

    return (
        <Box style={{height: "100%", width: "100%", padding: "10px"}}>
            <Typography color={"textPrimary"} variant="h5" component="h2" sx={{margin: "5px"}}>
                Checkup Actions - Dashboard
            </Typography>
            <Divider/>
            <NavLink to={"/checkup-actions/add"}>
                <Button color="primary" startIcon={<AddIcon />} >
                    Add new
                </Button>
            </NavLink>
            <DataGrid
                rows={rows}
                columns={columns}
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