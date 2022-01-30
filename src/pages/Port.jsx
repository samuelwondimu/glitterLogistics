import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Port() {
    return <Paper sx={{ p: 2 }}>
        <Typography fontWeight={'bold'} gutterBottom>Port</Typography>
        <DataGrid
            style={{ minHeight: '68vh', border: 'none' }}
            rows={rows}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[8]}
            disableSelectionOnClick
        />
    </Paper>;
}

const rows = [
];
const columns = [
    {
        fieldName: 'id',
        headerName: 'ID',
        width: 150,
    },
    {
        fieldName: "Port",
        headerName: "Port",
        width: 150,
    },
    {
        fieldName: "PortID",
        headerName: "Port ID",
        width: 150,
    },
    {
        fieldName: "PortName",
        headerName: "Port Name",
        width: 150,
    },
    {
        fieldName: "Country",
        headerName: "Country",
        width: 150,
    },
    {
        fieldName: "UserID",
        headerName: "User ID",
        width: 150,
    }
];
