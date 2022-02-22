import React, { useEffect, useState } from "react";
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
import { useQuery } from "react-query";
import { createPort, deletePort, getPorts, updatePorts } from "../api/port";
import { useSnackbar } from "notistack";

export default function Port() {
  const { enqueueSnackbar } = useSnackbar();
  const [portData, setPortData] = useState([]);

  // handle edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editPort, setEditPort] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditPort(null);
  };

  // handle create modal
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "PortName",
      headerName: "Port Name",
      width: 150,
    },
    {
      field: "Country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        async function editRow() {
          const rowData = params.row;
          handleEditOpen();
          setEditPort(rowData);
          console.log(`${params.row.id} edited`)
        }

        async function deleteRow() {
          await deletePort(localStorage.getItem("token"), params.row.id).then((res) => {
            const responseMessage = res
            if (responseMessage.ID === 2) {
              alert("Port deleted successfully")
            } else if (responseMessage.ID === 0) {
              refetch()
              enqueueSnackbar(responseMessage.Message, { variant: "error" });
              setPortData(portData.filter((item) => item.id !== params.row.id));
            }
          });
        }

        return (
          <>
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              sx={{ mr: 1 }}
              color="success"
              onClick={editRow}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteOutline />}
              color="error"
              onClick={deleteRow}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const { isLoading, error, data, refetch } = useQuery('repoData', () =>
    getPorts(localStorage.getItem('token')).then((res) => res)
  )

  // create modal
  const handleCreate = (event) => {
    event.preventDefault();
    const Data = new FormData(event.currentTarget);
    const port = {
      PortName: Data.get("PortName"),
      Country: Data.get("Country"),
    };
    createPort(port, localStorage.getItem("token")).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      refetch();
      setCreateOpen(false);
      handleCreateClose();
    });
  }

  // edit modal
  const handleEdit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const port = {
      PortID: editPort.id,
      PortName: data.get("PortName"),
      Country: data.get("Country"),
    };
    updatePorts(localStorage.getItem("token"), port).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      refetch();
      handleEditClose();
    });
  };

  useEffect(() => {
    console.log(data)
    if (data) {
      setPortData(data.map((port) => ({ id: port.PortID, PortName: port.PortName, Country: port.Country })));
    }
  }, [data]);


  if (error) return 'An error has occurred: ' + error.message

  console.log("PORT", portData)

  function addCustomerToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreateOpen}
        >
          Add Port
        </Button>
      </GridToolbarContainer>
    );
  }

  console.log("DATA", data);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Port
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={portData}
        columns={columns}
        components={{
          Toolbar: addCustomerToolBar,
        }}
        pageSize={12}
        loading={isLoading}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />

      {/* create */}
      <Dialog onClose={handleCreateClose} open={createOpen}>
        <DialogTitle>Create Port</DialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleCreate}
          sx={{ px: 3, pb: 3 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Port Name"
                name="PortName"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Country"
                name="Country"
              />
            </Grid>
            <Grid item xs={6}>
              <Button type='submit' variant="contained">Create Port</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

      {/* edit  */}
      <Dialog onClose={handleEditClose} open={editOpen}>
        <DialogTitle>Edit Port</DialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleEdit}
          sx={{ px: 3, pb: 3 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Port Name"
                name="PortName"
                defaultValue={editPort ? editPort.PortName : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Country"
                name="Country"
                defaultValue={editPort ? editPort.Country : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <Button type='submit' variant="contained">Update Port</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}

