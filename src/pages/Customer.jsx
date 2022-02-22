import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useSnackbar } from 'notistack';
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
import { createCustomer, deleteCustomer, getCustomers, updateCustomer, updateDeactivate } from "../api/customers";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

export default function Customer() {
  const [customers, setCustomers] = useState('')
  const { enqueueSnackbar } = useSnackbar();

  // handle create customer
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // handle delete modal
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteCustomerdata, setDeleteCustomerdata] = useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  // handle edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditCustomer(null);
  };

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
      renderCell: (params) => {
        async function handleDelete() {
          const rowData = params.row;
          await deleteCustomer(localStorage.getItem("token"), params.row.id).then((res) => {
            const responseMessage = res
            if (responseMessage.ID === 2) {
              setDeleteCustomerdata(rowData);
              handleDeleteOpen();
              setDeleteMessage(responseMessage.Message)
            } else if (responseMessage.ID === 0) {
              enqueueSnackbar(responseMessage.Message);
              setCustomers(customers.filter(customer => customer.id !== params.row.id))
            }
          })
        }

        async function handleEdit() {
          const rowData = params.row;
          handleEditOpen();
          setEditCustomer(rowData);
          console.log(`${params.row.id} edited`)
        }

        return (
          <>
            <Button
              variant="contained"
              startIcon={<DeleteOutline />}
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
        );
      },
    },
  ];


  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      CustomerName: data.get("CustomerName"),
      CustomerType: data.get("CustomerType"),
      ContactPersons: data.get("ContactPersons"),
      Address: data.get("Address"),
      Telephone1: data.get("Telephone1"),
      Mobile: data.get("Mobile"),
      VATRegNo: data.get("VATRegNo"),
      Email: data.get("Email"),
      TINNo: data.get("TINNo"),
    };
    console.log(customer)
    createCustomer(customer, localStorage.getItem("token")).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      refetch();
      setCreateOpen(false);
      handleCreateClose();
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      CustomerID: editCustomer.id,
      CustomerName: data.get("CustomerName"),
      CustomerType: data.get("CustomerType"),
      ContactPersons: data.get("ContactPersons"),
      Address: data.get("Address"),
      Telephone1: data.get("Telephone1"),
      Mobile: data.get("Mobile"),
      VATRegNo: data.get("VATRegNo"),
      Email: data.get("Email"),
      TINNo: data.get("TINNo"),
    };
    console.log(customer)
    updateCustomer(localStorage.getItem("token"), customer).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      refetch();
      handleEditClose();
    });

    setCustomers(customers.filter(customer => customer.id !== editCustomer.id))
    setCustomers(customers.push(customer))
  };

  // delete customer
  const handleDelete = async () => {
    await updateDeactivate(localStorage.getItem("token"), deleteCustomerdata?.id).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      setCustomers(customers.filter(customer => customer.id !== deleteCustomerdata?.id))
      refetch();
    })
    handleDeleteClose();
  };

  console.log(editCustomer)
  function addCustomerToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreateOpen}
        >
          Add Customer
        </Button>
      </GridToolbarContainer>
    );
  }

  const { isLoading, error, data, refetch } = useQuery('customers', () =>
    getCustomers(localStorage.getItem("token")).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setCustomers(data.map((customer) => ({ id: customer.CustomerID, ...customer })));
    };
  }, [data]);

  console.log("CUSTOMERS", customers);


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
        loading={isLoading}
        disableSelectionOnClick
      />

      <Dialog onClose={handleCreateClose} open={createOpen}>
        <DialogTitle>Add A New Customer</DialogTitle>
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
                label="Customer Name"
                name="CustomerName"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Customer Type"
                name="CustomerType"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Address"
                name="Address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact Person"
                name="ContactPersons"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Telephone 1"
                name="Telephone1"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="E-mail"
                name="Email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="mobile"
                name="Mobile"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="VAT REG No"
                name="VATRegNo"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Tin No"
                name="TINNo"
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained">Add Customer</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      {/* delete modal */}
      <Dialog onClose={handleDeleteClose} open={openDelete}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {deleteMessage}
        </Typography>
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>yes</Button>
        <Button variant='contained' onClick={handleDeleteClose}>no</Button>
      </Dialog>
      {/* edit modal */}
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
      >
        <DialogTitle>Edit Customer</DialogTitle>

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
                label="Customer Name"
                name="CustomerName"
                defaultValue={editCustomer?.CustomerName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Customer Type"
                name="CustomerType"
                defaultValue={editCustomer?.CustomerType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Address"
                name="Address"
                defaultValue={editCustomer?.Address}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact Person"
                name="ContactPersons"
                defaultValue={editCustomer?.ContactPersons}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Telephone 1"
                name="Telephone1"
                defaultValue={editCustomer?.Telephone1}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="E-mail"
                name="Email"
                defaultValue={editCustomer?.Email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="mobile"
                name="Mobile"
                defaultValue={editCustomer?.Mobile}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="VAT REG No"
                name="VATRegNo"
                defaultValue={editCustomer?.VATRegNo}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Tin No"
                name="TINNo"
                defaultValue={editCustomer?.TINNo}
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained">Edit Customer</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Paper>
  );
}
