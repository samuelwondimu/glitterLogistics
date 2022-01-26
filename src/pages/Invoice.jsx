import { Inventory2 } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

export default function Invoice() {

    function addCustomerToolBar() {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<Inventory2 />} variant="contained" sx={{ textTransform: 'none' }}>
                    New Invoice
                </Button>
            </GridToolbarContainer>
        );
    }

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

function createRow(data) {
    return {
        id: data.id,
        InvoiceNo: data.InvoiceNo,
        InvoiceDate: data.InvoiceDate,
        OperationNumber: data.OperationNumber,
        InvoiceAmount: data.InvoiceAmount,
        Remark: data.Remark,
        UserID: data.UserID
    }
}

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'InvoiceNo',
        headerName: 'InvoiceNo',
        width: 150
    },
    {
        field: 'InvoiceDate',
        headerName: 'Invoice Date',
        width: 150
    },
    {
        field: 'OperationNumber',
        headerName: 'Operation Number',
        width: 150
    },
    {
        field: 'InvoiceAmount',
        headerName: 'Invoice Amount',
        width: 150,
    },
    {
        field: 'Remark',
        headerName: 'Remark',
        width: 250
    },
    {
        field: 'UserID',
        headerName: 'User ID',
        width: 150,
    }
];

const rows = [
    createRow({
        id: 231,
        InvoiceNo: '938092',
        InvoiceDate: '12-may-2021',
        OperationNumber: '1281238182093',
        InvoiceAmount: '32,233,829 Birr',
        Remark: 'Delivery fro Dubai Ports to Addis Abba through Kneyeahfasdj',
        UserID: 'hj9d9wdj1093duj109'
    }),
    createRow({
        id: 2231,
        InvoiceNo: '9332092',
        InvoiceDate: '12-may-2021',
        OperationNumber: '1281238182093',
        InvoiceAmount: '32,233,829 Birr',
        Remark: 'Delivery fro Dubai Ports to Addis Abba through Kneyeahfasdj',
        UserID: 'hj9d9wdj1093duj109'
    }),
    createRow({
        id: 21231,
        InvoiceNo: '938092',
        InvoiceDate: '12-may-2021',
        OperationNumber: '1281238182093',
        InvoiceAmount: '32,233,829 Birr',
        Remark: 'Delivery fro Dubai Ports to Addis Abba through Kneyeahfasdj',
        UserID: 'hj9d9wdj1093duj109'
    }),
    createRow({
        id: 21231,
        InvoiceNo: '938092',
        InvoiceDate: '12-may-2021',
        OperationNumber: '1281238182093',
        InvoiceAmount: '32,233,829 Birr',
        Remark: 'Delivery fro Dubai Ports to Addis Abba through Kneyeahfasdj',
        UserID: 'hj9d9wdj1093duj109'
    })

]