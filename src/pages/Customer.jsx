import React, { useState } from "react";
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

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "customerName",
    headerName: "Customer name",
    width: 150,
    editable: true,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "customerType",
    headerName: "Customer Type",
    width: 150,
    editable: true,
  },
  {
    field: "ContactPerson",
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
    field: "Telephone",
    headerName: "Telephone",
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
    field: "VATNo",
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

const rows = [
  {
    id: 1,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
  },
  {
    id: 2,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
  },
  {
    id: 3,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
  },
  {
    id: 4,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
  },
  {
    id: 5,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  {
    id: 6,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Melisandre",
    firstName: null,
    age: 150,
  },
  {
    id: 7,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
  },
  {
    id: 8,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
  },
  {
    id: 9,
    customerType: "manager",
    ContactPerson: "ababeb",
    Adress: "addis ababa bole",
    Telephone: "345241481",
    Mobile: "3123212412",
    VATNo: "12413123",
    Email: "glitter@gmail.com",
    TINNo: "98240918043",
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
];

export default function Customer() {
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
  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Customers
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
