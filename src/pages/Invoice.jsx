import { DeleteOutline, EditOutlined, Inventory2 } from "@mui/icons-material";
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
import { getInvoice } from "../api/invoice";

export default function Invoice() {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState(null)
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
          startIcon={<Inventory2 />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleClickOpen}
        >
          New Invoice
        </Button>
      </GridToolbarContainer>
    );
  }

  const { isLoading, error, data } = useQuery('invoice', () =>
    getInvoice(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setInvoices(data.map((invoice) => ({ id: invoice.InvoiceNo, ...invoice })));
    };
  }, [data]);

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Invoices
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={invoices}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        loading={isLoading}
        pageSize={7}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add An Invoice</DialogTitle>
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
            <Grid item xs={6} />
            <Grid item xs={6}>
              <Button variant="contained">Add Invoice</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "InvoiceNo",
    headerName: "InvoiceNo",
    width: 150,
  },
  {
    field: "InvoiceDate",
    headerName: "Invoice Date",
    width: 150,
  },
  {
    field: "OperationNumber",
    headerName: "Operation Number",
    width: 150,
  },
  {
    field: "InvoiceAmount",
    headerName: "Invoice Amount",
    width: 150,
  },
  {
    field: "Remark",
    headerName: "Remark",
    width: 250,
  },
  {
    field: "UserID",
    headerName: "User ID",
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