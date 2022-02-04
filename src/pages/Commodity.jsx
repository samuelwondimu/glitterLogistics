import {
  Add as AddIcon,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
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

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "CommodityName",
    headerName: "Commodity name",
    width: 150,
    editable: true,
  },
  {
    field: "Category",
    headerName: "Category",
    width: 150,
  },
  {
    filed: "HsCode",
    headerName: "HS Code",
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
  {
    id: 1,
    CommodityName: "Snow",
    Category: "Jon",
    HsCode: 35,
    UserID: "fksdjfksjdklf",
  },
  {
    id: 2,
    CommodityName: "Lannister",
    Category: "Cersei",
    HsCode: "42",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 3,
    CommodityName: "Lannister",
    Category: "Jaime",
    HsCode: "45",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 4,
    CommodityName: "Stark",
    Category: "Arya",
    HsCode: "16",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 5,
    CommodityName: "Targaryen",
    Category: "Daenerys",
    HsCode: "89",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 6,
    CommodityName: "Melisandre",
    Category: null,
    HsCode: "150",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 7,
    CommodityName: "Clifford",
    Category: "Ferrara",
    HsCode: "44",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 8,
    CommodityName: "Frances",
    Category: "Rossini",
    HsCode: "36",
    UserID: "fksdjfksjdklf",
  },
  {
    id: 9,
    CommodityName: "Roxie",
    Category: "Harvey",
    HsCode: "65",
    UserID: "fksdjfksjdklf",
  },
];

export default function Commodity() {
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
          components={{
            Toolbar: addCustomerToolBar,
          }}
        >
          Add Commodity
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography fontWeight={"bold"} gutterBottom>
          Commodity
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
          <DialogTitle>Add Commodity</DialogTitle>
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
                <Button variant="contained">Add Commodity</Button>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </Paper>
    </>
  );
}
