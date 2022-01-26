import { Add } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';



function createRow(data) {
    return {
        id: data.id,
        operationNumber: data.operationNumber,
        CustomerID: data.CustomerID,
        OperationType: data.OperationType,
        PermitNumber: data.PermitNumber,
        DeclarationNumber: data.DeclarationNumber,
        TypeOfDeclaration: data.TypeOfDeclaration,
        CustomerReferenceNumber: data.CustomerReferenceNumber,
        OrderType: data.OrderType,
        ShippingInstructionNumber: data.ShippingInstructionNumber,
        Remark: data.Remark,
        UserID: data.UserID
    }
}

export default function Operations() {

    function addCustomerToolBar() {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<Add />} variant="contained" sx={{ textTransform: 'none' }}>
                    New Operation
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography fontWeight={'bold'} gutterBottom>Operations</Typography>
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


const columns = [
    {
        field: 'id',
        headerName: 'ID'
    },
    {
        field: 'operationNumber',
        headerName: 'Operation Number',
        width: 150,
    },
    {
        field: 'CustomerID',
        headerName: 'Customer ID',
        width: 150,
    },
    {
        field: 'OperationType',
        headerName: 'Operation Type',
        width: 150,
    },
    {
        field: 'PermitNumber',
        headerName: 'Permit Number',
        width: 150,
    },
    {
        field: 'DeclarationNumber',
        headerName: 'Declaration Number',
        width: 150,
    },
    {
        field: 'TypeOfDeclaration',
        headerName: 'Type Of Declaration',
        width: 150,
    },
    {
        field: 'CustomerReferenceNumber',
        headerName: 'Customer Reference Number',
        width: 150,
    },
    {
        field: 'OrderType',
        headerName: 'Order Type',
        width: 150,
    },
    {
        field: 'ShippingInstructionNumber',
        headerName: 'Shipping Instruction Number',
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
    }
]

const rows = [
    createRow({
        id: 334,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    }),
    createRow({
        id: 335,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    }),
    createRow({
        id: 336,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    }),
    createRow({
        id: 337,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    }),
    createRow({
        id: 338,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    }),
    createRow({
        id: 339,
        operationNumber: '312',
        CustomerID: '453',
        OperationType: 'shipping',
        PermitNumber: '123',
        DeclarationNumber: '0912',
        TypeOfDeclaration: 'construction',
        CustomerReferenceNumber: '31',
        OrderType: 'cargo',
        ShippingInstructionNumber: '123091823',
        Remark: 'to be delivered as fast',
        UserID: '1231',
    })
]
