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
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import {
  Add as AddIcon,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import { getExpense } from "../api/Expense";

export default function Expense() {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState(null)
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
          components={{
            Toolbar: addCustomerToolBar,
          }}
        >
          Add Expense
        </Button>
      </GridToolbarContainer>
    );
  }

  const { isLoading, error, data } = useQuery('expense', () =>
    getExpense(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setExpenses(data.map((expense) => ({ id: expense.ExpenseID, ...expense })));
    };
  }, [data]);

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Expenses
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={expenses}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        loading={isLoading}
        pageSize={12}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add Expense</DialogTitle>
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
              <Button variant="contained">Add Expense</Button>
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
    width: 150,
  },
  {
    field: "intAutoID",
    headerName: "Int Auto ID",
    width: 150,
  },
  {
    field: "ExpenseID",
    headerName: "Expense ID",
    width: 150,
  },
  {
    field: "OperationNumber",
    headerName: "Operation Number",
    width: 150,
  },
  {
    field: "ServiceProviderID",
    headerName: "Service Provider ID",
    width: 150,
  },
  {
    field: "ExpenseDate",
    headerName: "Expense Date",
    width: 150,
  },
  {
    field: "Amount",
    headerName: "Amount",
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
