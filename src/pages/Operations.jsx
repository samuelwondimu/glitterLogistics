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
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getOperations } from "../api/operation";

export default function Operations() {
  const [operations, setOperations] = useState(null);
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


  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "OperationType",
      headerName: "Operation Type",
      width: 100,
    },
    {
      field: 'StartDate',
      headerName: 'Start Date',
      width: 100,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      width: 100,
    },
    {
      field: "LoadPortName",
      headerName: "Load Port Name",
      width: 100,
    },
    {
      field: "DischargePortName",
      headerName: "Discharge Port Name",
      width: 150,
    },
    {
      field: "OperationType",
      headerName: "Operation Type",
      width: 50,
    },
    {
      field: "TypeOfDeclaration",
      headerName: "Type Of Declaration",
      width: 100,
    },
    {
      field: "OrderType",
      headerName: "Order Type",
      width: 150,
    },
    {
      field: "Remark",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "OperationStatus",
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


  const { isLoading, error, data } = useQuery('operations', () =>
    getOperations(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setOperations(data.map((operation) => ({ id: operation.OperationNumber, ...operation })));
    };
  }, [data]);

  console.log("OPERATION", data);

  if (error) return 'An error has occurred: ' + error.message

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
        rows={operations}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        loading={isLoading}
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
