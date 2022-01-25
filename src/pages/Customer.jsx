import React from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { Button, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'customerName',
        headerName: 'Customer name',
        width: 150,
        editable: true,
    },
    {
        field: 'customerType',
        headerName: 'Customer Type',
        width: 150,
        editable: true,
    },
    {
        field: 'ContactPerson',
        headerName: 'Contact Person',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'Address',
        headerName: 'Address',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'Telephone',
        headerName: 'Telephone',
        width: 150,
        editable: true,

    },
    {
        field: 'Mobile',
        headerName: 'Mobile',
        width: 150,
        editable: true,
    },
    {
        field: 'VATNo',
        headerName: 'VAT No',
        width: 150,
    },
    {
        field: 'Email',
        headerName: 'Email',
        width: 150,
    },
    {
        field: 'TINNo',
        headerName: 'TIN No',
        width: 150,
    },
    {
        field: 'UserID',
        headerName: 'User ID',
        width: 150,
    },

];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function addCustomerToolBar() {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} variant="contained">
                Add Customer
            </Button>
        </GridToolbarContainer>
    );
}

export default function Customer() {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography fontWeight={'bold'} gutterBottom>Customers</Typography>
            <DataGrid
                style={{ minHeight: '68vh', border: 'none' }}
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: addCustomerToolBar,
                }}
                pageSize={7}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </Paper>
    );
}
