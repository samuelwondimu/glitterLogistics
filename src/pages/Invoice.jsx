import { DeleteOutline, EditOutlined, Inventory2 } from "@mui/icons-material";
import {
  Autocomplete,
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
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCustomers } from "../api/customers";
import { createInvoice, getInvoice } from "../api/invoice";
import { getOperations } from "../api/operation";
import CustomeDialog from "../components/CustomDialog";

export default function Invoice() {
  const [invoices, setInvoices] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);
  const [operations, setOperations] = useState(null);
  const [newOperation, setNewOperation] = useState(null);
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
  const [editInvoice, setEditInvoice] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditInvoice(null);
  };

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
      renderCell: (params) => {
        async function handleDelete() { }

        async function handleEdit() {
          const rowData = params.row;
          setEditInvoice(rowData);
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

  function addCustomerToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<Inventory2 />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleCreateOpen}
        >
          New Invoice
        </Button>
      </GridToolbarContainer>
    );
  }

  const { isLoading, error, data, refetch } = useQuery('invoice', () =>
    getInvoice(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setInvoices(data.map((invoice) => ({ id: invoice.InvoiceNo, ...invoice })));
    };
    getCustomers(localStorage.getItem("token")).then((res) => res).then((res) => {
      setCustomers(res.map((customer) => ({ id: customer.CustomerID, label: customer.CustomerName })));
    });
    getOperations(localStorage.getItem("token")).then((res) => res).then((res) => {
      setOperations(res.map((operation) => ({ id: operation.OperationNumber, label: operation.OperationNumber })));
    });
  }, [data]);

  async function handleCreate(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const invoice = {
      InvoiceNo: data.get("InvoiceNo"),
      CustomerID: await newCustomer?.id,
      CustomerName: await newCustomer?.label,
      OperationNumber: await newOperation?.id,
      InvoiceDate: new Date(Date.now()),
      InvoiceAmount: data.get("InvoiceAmount"),
      Remark: data.get("Remark"),
    }
    console.log(invoice)
    await createInvoice(invoice, localStorage.getItem("token")).then((res) => res).then((res) => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.message, { variant: "success" });
      refetch();
      setCreateOpen(false);
    });
  }
  async function handleEdit() { }
  const invoiceForm = [
    {
      label: 'Invoice Number',
      name: 'InvoiceNo',
      defaultValue: editInvoice ? editInvoice.InvoiceNo : '',
    },
    {
      label: 'Invoice Amount',
      name: 'InvoiceAmount',
      defaultValue: editInvoice ? editInvoice.InvoiceAmount : '',
    },
    {
      label: 'Remark',
      name: 'Remark',
      defaultValue: editInvoice ? editInvoice.Remark : '',
    }
  ]

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

      {/* create customer */}
      <CustomeDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleSubmit={handleCreate}
        title={'Add A New Invoice'}
        submitText={'create invoice'}
        cancelText={'cancel'}
        formData={invoiceForm}
      >
        <Grid item xs={6} >
          <Autocomplete
            onChange={(event, newValue) => {
              setNewOperation(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={operations}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="operations" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            onChange={(event, newValue) => {
              setNewCustomer(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={customers}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="customers" />}
          />
        </Grid>
      </CustomeDialog>

      {/* edit modal */}
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Update invoice'}
        submitText={'update invoice'}
        cancelText={'cancel'}
        formData={invoiceForm}
      />
    </Paper>
  );
}
