import { DeleteOutline, EditOutlined, Inventory2Sharp } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { createServiceProvider, deleteServiceProvider, editServiceProvider, getServceProvider } from "../api/serviceprovider";
import CustomeDialog from "../components/CustomDialog";

export default function ServiceProvider() {
  const [serviceproviders, setServiceproviders] = useState(null);
  const [editServiceData, setEditServiceData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  // handle create customer
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // handle delete modal
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteInvoicedata, setDeleteInvoicedata] = useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  // handle edit modal
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditServiceData(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "ServiceProviderName", headerName: "ServiceProvider Name", width: 150,
    },
    {
      field: 'ServiceType',
      headerName: 'Service Type',
      width: 150,
    },
    {
      field: "ContactPersons",
      headerName: "Contact Person",
      width: 150,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "Telephone1",
      headerName: "Telephone1",
      width: 150,
    },
    {
      field: "Telephone2",
      headerName: "Telephone2",
      width: 150,
    },
    {
      field: 'Mobile',
      headerName: 'Mobile',
      width: 150,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "VATRegNo",
      headerName: "VAT Reg No",
      width: 150,
    },
    {
      field: 'TINNo',
      headerName: 'TIN No',
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        async function handleDelete() {
          await deleteServiceProvider(localStorage.getItem("token"), params.row.ServiceProviderID).then(res => {
            const responseMessage = res;
            enqueueSnackbar(responseMessage.Message, {
              variant: "success",
            });
            refetch();
          })
        }

        async function handleEdit() {
          const rowData = params.row;
          setEditServiceData(rowData);
          handleEditOpen();
        }

        return (
          <>
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              sx={{ mr: 1 }}
              color="success"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button variant="contained" startIcon={<DeleteOutline />} color="error" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )
      }
    },
  ];

  function addToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<Inventory2Sharp />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleCreateOpen}
        >
          New Service Provider
        </Button>
      </GridToolbarContainer>
    );
  }

  async function handleCreate(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const serviceProvider = {
      ServiceProviderName: data.get("ServiceProviderName"),
      ServiceType: data.get("ServiceType"),
      ContactPersons: data.get("ContactPersons"),
      Address: data.get("Address"),
      Telephone1: data.get("Telephone1"),
      Telephone2: data.get("Telephone2"),
      Mobile: data.get("Mobile"),
      Email: data.get("Email"),
      VATRegNo: data.get("VATRegNo"),
      TINNo: data.get("TINNo"),
    };

    await createServiceProvider(serviceProvider, localStorage.getItem("token")).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, {
        variant: "success",
      });
      handleCreateClose();
      refetch();
    });
  }

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const serviceProvider = {
      ServiceProviderID: editServiceData.ServiceProviderID,
      ServiceProviderName: data.get("ServiceProviderName"),
      ServiceType: data.get("ServiceType"),
      ContactPersons: data.get("ContactPersons"),
      Address: data.get("Address"),
      Telephone1: data.get("Telephone1"),
      Telephone2: data.get("Telephone2"),
      Mobile: data.get("Mobile"),
      Email: data.get("Email"),
      VATRegNo: data.get("VATRegNo"),
      TINNo: data.get("TINNo"),
    };

    await editServiceProvider(localStorage.getItem("token"), serviceProvider).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, {
        variant: "success",
      });
      handleEditClose();
      refetch();
    });
  }

  const { isLoading, error, data, refetch } = useQuery('invoice', () =>
    getServceProvider(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setServiceproviders(data.map((item, i) => ({ id: i, ...item })));
    }
  }, [data]);

  const serviceproviderForm = [
    {
      label: "Service Provider Name",
      name: "ServiceProviderName",
      defaultValue: editServiceData ? editServiceData.ServiceProviderName : "",
    },
    {
      label: "Service Type",
      name: "ServiceType",
      defaultValue: editServiceData ? editServiceData.ServiceType : "",
    },
    {
      label: "Contact Person",
      name: "ContactPersons",
      defaultValue: editServiceData ? editServiceData.ContactPersons : "",
    },
    {
      label: "Address",
      name: "Address",
      defaultValue: editServiceData ? editServiceData.Address : "",
    },
    {
      label: "Telephone1",
      name: "Telephone1",
      defaultValue: editServiceData ? editServiceData.Telephone1 : "",

    },
    {
      label: "Telephone2",
      name: "Telephone2",
      type: 'numeric',
      defaultValue: editServiceData ? editServiceData.Telephone2 : "",

    },
    {
      label: "Mobile",
      name: "Mobile",
      type: 'numeric',
      defaultValue: editServiceData ? editServiceData.Mobile : "",

    },
    {
      label: "Email",
      name: "Email",
      defaultValue: editServiceData ? editServiceData.Email : "",
    },
    {
      label: "VAT Reg No",
      name: "VATRegNo",
      type: 'numeric',
      defaultValue: editServiceData ? editServiceData.VATRegNo : "",
    },
    {
      label: "TIN No",
      name: "TINNo",
      type: 'numeric',
      defaultValue: editServiceData ? editServiceData.TINNo : "",
    },
  ]

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} gutterBottom>
        Service Provider
      </Typography>
      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={serviceproviders}
        columns={columns}
        components={{
          Toolbar: addToolBar,
        }}
        loading={isLoading}
        pageSize={7}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />
      <CustomeDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleSubmit={handleCreate}
        title={'Add A New Service Provider'}
        submitText={'create Service Provider'}
        cancelText={'cancel'}
        formData={serviceproviderForm}
      ></CustomeDialog>
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Edit Service Provider'}
        submitText={'Edit Service Provider'}
        cancelText={'cancel'}
        formData={serviceproviderForm}
      ></CustomeDialog>
    </Paper>
  );
}
