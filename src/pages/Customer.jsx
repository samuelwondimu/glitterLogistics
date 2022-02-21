import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
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
import { Add as AddIcon, DeleteOutline } from "@mui/icons-material";
import { getCustomers } from "../api/customers";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

const columns = [
  { field: "id", headerName: "ID", hidden: true },
  {
    field: "CustomerName",
    headerName: "Customer name",
    width: 150,
  },
  {
    field: "CustomerType",
    headerName: "Customer Type",
    width: 150,
    editable: true,
  },
  {
    field: "ContactPersons",
    headerName: "Contact Person",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "Address",
    headerName: "Address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "Telephone1",
    headerName: "Telephone One",
    width: 150,
    editable: true,
  },
  {
    field: "Mobile",
    headerName: "Mobile",
    width: 100,
    editable: true,
  },
  {
    field: "VATRegNo",
    headerName: "VAT No",
    width: 100,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "TINNo",
    headerName: "TIN No",
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
          startIcon={<DeleteOutline />}
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

export default function Customer() {
  const [customers, setCustomers] = useState('')

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
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Customer
        </Button>
      </GridToolbarContainer>
    );
  }

  const { isLoading, error, data } = useQuery('customers', () =>
    getCustomers(localStorage.getItem("token")).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setCustomers(data.map((customer) => ({ id: customer.CustomerID, ...customer })));
    };
  }, [data]);

  console.log("CUSTOMERS", customers);

  if (isLoading) return <Loading />;

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Customers
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={customers}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        disableSelectionOnClick
      />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add A New Customer</DialogTitle>
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
              <Button variant="contained">Add Customer</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}
