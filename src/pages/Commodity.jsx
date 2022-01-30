import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'CommodityName',
        headerName: 'Commodity name',
        width: 150,
        editable: true,
    },
    {
        field: 'Category',
        headerName: 'Category',
        width: 150,
    },
    {
        filed: 'HsCode',
        headerName: 'HS Code',
        width: 150,

    },
    {
        field: 'UserId',
        headerName: 'User Id',
        width: 150,
    }
]

const rows = [
    { id: 1, CommodityName: 'Snow', Category: 'Jon', HsCode: '35', UserID: 'fksdjfksjdklf' },
    { id: 2, CommodityName: 'Lannister', Category: 'Cersei', HsCode: '42', UserID: 'fksdjfksjdklf' },
    { id: 3, CommodityName: 'Lannister', Category: 'Jaime', HsCode: '45', UserID: 'fksdjfksjdklf' },
    { id: 4, CommodityName: 'Stark', Category: 'Arya', HsCode: '16', UserID: 'fksdjfksjdklf' },
    { id: 5, CommodityName: 'Targaryen', Category: 'Daenerys', HsCode: '89', UserID: 'fksdjfksjdklf' },
    { id: 6, CommodityName: 'Melisandre', Category: null, HsCode: '150', UserID: 'fksdjfksjdklf' },
    { id: 7, CommodityName: 'Clifford', Category: 'Ferrara', HsCode: '44', UserID: 'fksdjfksjdklf' },
    { id: 8, CommodityName: 'Frances', Category: 'Rossini', HsCode: '36', UserID: 'fksdjfksjdklf' },
    { id: 9, CommodityName: 'Roxie', Category: 'Harvey', HsCode: '65', UserID: 'fksdjfksjdklf' },
];


export default function Commodity() {
    return <>
        <Paper sx={{ p: 2 }}>
           <Typography fontWeight={'bold'} gutterBottom>Commodity</Typography>
            <DataGrid
                style={{ minHeight: '68vh', border: 'none' }}
                rows={rows}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            /> 
        </Paper>
    </>;
}
