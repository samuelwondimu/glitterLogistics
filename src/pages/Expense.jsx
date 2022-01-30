import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export default function Expense() {

    return <Paper sx={{ p: 2 }}>
        <Typography fontWeight={'bold'} gutterBottom>Expenses</Typography>
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

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
    },
    {
        field: 'intAutoID',
        headerName: 'Int Auto ID',
        width: 150,
    },
    {

        field: 'ExpenseID',
        headerName: 'Expense ID',
        width: 150,
    },
    {

        field: 'OperationNumber',
        headerName: 'Operation Number',
        width: 150,
    },
    {
        field: 'ServiceProviderID',
        headerName: 'Service Provider ID',
        width: 150,
    },
    {
        field: 'ExpenseDate',
        headerName: 'Expense Date',
        width: 150,
    },
    {
        field: 'Amount',
        headerName: 'Amount',
        width: 150,
    },
    {
        field: 'Remark',
        headerName: 'Remark',
        width: 150,
    },
    {
        field: 'UserID',
        headerName: 'User ID',
        width: 150,
    },
]

const rows = [
    { id: 1, intAutoID: 'Snow', ExpenseID: 'Jon', OperationNumber: '35', ServiceProviderID: 'fksdjfksjdklf', ExpenseDate: 'fksdjfksjdklf', Amount: 'fksdjfksjdklf', Remark: 'fksdjfksjdklf', UserID: 'fksdjfksjdklf' },
    { id: 2, intAutoID: 'Lannister', ExpenseID: 'Cersei', OperationNumber: '42', ServiceProviderID: 'fksdjfksjdklf', ExpenseDate: 'fksdjfksjdklf', Amount: 'fksdjfksjdklf', Remark: 'fksdjfksjdklf', UserID: 'fksdjfksjdklf' },
    { id: 3, intAutoID: 'Lannister', ExpenseID: 'Jaime', OperationNumber: '45', ServiceProviderID: 'fksdjfksjdklf', ExpenseDate: 'fksdjfksjdklf', Amount: 'fksdjfksjdklf', Remark: 'fksdjfksjdklf', UserID: 'fksdjfksjdklf' },
    { id: 4, intAutoID: 'Stark', ExpenseID: 'Arya', OperationNumber: '16', ServiceProviderID: 'fksdjfksjdklf', ExpenseDate: 'fksdjfksjdklf', Amount: 'fksdjfksjdklf', Remark: 'fksdjfksjdklf', UserID: 'fksdjfksjdklf' },
];