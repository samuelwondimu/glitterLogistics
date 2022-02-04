import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";

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
    UserID: data.UserID,
  };
}

export default function Operations() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };
  function addCustomerToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<Add />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleClickOpen}
        >
          New Operation
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Operations
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        disableSelectionOnClick
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add A New Operation</DialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ px: 3, pb: 3 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Customer Name"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Customer Type"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Contact Person"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Telephone 2"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Telephone 2"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="mobile"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="VAT No"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tin No"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained">Add Operation</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "operationNumber",
    headerName: "Operation Number",
    width: 150,
  },
  {
    field: "CustomerID",
    headerName: "Customer ID",
    width: 100,
  },
  {
    field: "OperationType",
    headerName: "Operation Type",
    width: 100,
  },
  {
    field: "PermitNumber",
    headerName: "Permit Number",
    width: 100,
  },
  {
    field: "DeclarationNumber",
    headerName: "Declaration Number",
    width: 100,
  },
  {
    field: "TypeOfDeclaration",
    headerName: "Type Of Declaration",
    width: 150,
  },
  {
    field: "CustomerReferenceNumber",
    headerName: "Customer Reference Number",
    width: 50,
  },
  {
    field: "OrderType",
    headerName: "Order Type",
    width: 100,
  },
  {
    field: "ShippingInstructionNumber",
    headerName: "Shipping Instruction Number",
    width: 150,
  },
  {
    field: "Remark",
    headerName: "Remark",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Actions",
    width: 250,
    renderCell: (params) => (
      <>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          sx={{ mr: 1 }}
          color="success"
        >
          Edit
        </Button>
        <Button variant="contained" startIcon={<DeleteOutline />} color="error">
          Delete
        </Button>
      </>
    ),
  },
];

const rows = [
  createRow({
    id: 334,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
  createRow({
    id: 335,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
  createRow({
    id: 336,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
  createRow({
    id: 337,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
  createRow({
    id: 338,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
  createRow({
    id: 339,
    operationNumber: "312",
    CustomerID: "453",
    OperationType: "shipping",
    PermitNumber: "123",
    DeclarationNumber: "0912",
    TypeOfDeclaration: "construction",
    CustomerReferenceNumber: "31",
    OrderType: "cargo",
    ShippingInstructionNumber: "123091823",
    Remark: "to be delivered as fast",
    UserID: "1231",
  }),
];
