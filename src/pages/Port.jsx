import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import {
  Add as AddIcon,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import { createPort, deletePort, getPorts, updatePortDelete, updatePorts } from "../api/port";
import { useSnackbar } from "notistack";
import CustomeDialog from '../components/CustomDialog'

export default function Port() {
  const { enqueueSnackbar } = useSnackbar();
  const [portData, setPortData] = useState([]);

  // handle delete modal
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deletePortdata, setDeletePortdata] = useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);


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
          const rowData = params.row;
          await deletePort(localStorage.getItem("token"), params.row.PortID).then((res) => {
            const responseMessage = res
            if (responseMessage.ID === 2) {
              setDeletePortdata(rowData);
              handleDeleteOpen();
              setDeleteMessage(responseMessage.Message)
            } else if (responseMessage.ID === 0) {
              enqueueSnackbar(responseMessage.Message, { variant: "error" });
              refetch();
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
    console.log(port)
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
      PortID: editPort.PortID,
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

  async function handleDelete() {
    console.log(deletePortdata)
    await updatePortDelete(localStorage.getItem("token"), deletePortdata?.PortID).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
    })
    setOpenDelete(false);
    refetch();
  }

  useEffect(() => {
    console.log(data)
    if (data) {
      setPortData(data.map((port, i) => ({ id: i, PortID: port.PortID, PortName: port.PortName, Country: port.Country })));
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

  const portForm = [
    {
      label: 'Port Name',
      name: 'PortName',
      defaultValue: editPort ? editPort?.PortName : ''
    },
    {
      label: 'Country',
      name: 'Country',
      defaultValue: editPort ? editPort?.Country : ''
    }
  ]

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

      {/* create port  */}
      <CustomeDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleSubmit={handleCreate}
        title={'Create Port'}
        submitText={'create port'}
        cancelText={'cancel'}
        formData={portForm}
      />

      {/* edit  */}
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Edit Port'}
        submitText={'update port'}
        cancelText={'cancel'}
        formData={portForm}
      />
      {/* delete */}
      <Dialog onClose={handleDeleteClose} open={openDelete}>
        <DialogTitle >
          {deleteMessage}
        </DialogTitle>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>yes</Button>
          <Button variant='contained' onClick={handleDeleteClose}>no</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

