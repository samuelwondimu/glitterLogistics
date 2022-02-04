import React, { useState } from "react";
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
import {
  Add as AddIcon,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";

export default function Port() {
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
      width: 90,
    },
    {
      field: "Port",
      headerName: "Port",
      width: 150,
    },
    {
      field: "Country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "PortName",
      headerName: "Port Name",
      width: 150,
    },
    {
      field: "PortID",
      headerName: "Port ID",
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
          <Button
            variant="contained"
            startIcon={<DeleteOutline />}
            color="error"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  function addCustomerToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Port
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Port
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        pageSize={12}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add A New Port</DialogTitle>
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
              <Button variant="contained">Add Port</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}

const rows = [
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
  {
    id: 2,
    Port: "china",
    PortID: "92304920",
    PortName: "china logstics",
    Country: "China",
  },
];
