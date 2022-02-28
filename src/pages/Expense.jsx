import {
  Autocomplete,
  Button,
  Dialog,
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
import { createExpense, deleteExpense, getExpense, getExpenseList, updateDeactivate, updateExpense } from "../api/Expense";
import CustomeDialog from "../components/CustomDialog";
import { useSnackbar } from "notistack";
import { getCustomers, } from "../api/customers";
import { getServceProvider } from "../api/serviceprovider";
import { getOperations } from "../api/operation";

export default function Expense() {
  const [expenses, setExpenses] = useState(null)
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);
  const [newServiceProvider, setNewServiceProvider] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);
  const [expenseList, setExpenseList] = useState(null);
  const [newExpenseList, setNewExpenseList] = useState(null);
  const [operations, setOperations] = useState(null);
  const [newOperation, setNewOperation] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // handle create customer
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // handle delete modal
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteExpensedata, setDeleteExpensedata] = useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  // handle edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditExpense(null);
  };

  async function handleCreate(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const expense = {
      // CustomerID: await newCustomer?.id,
      // CustomerName: await newCustomer?.label,
      ServiceProviderID: await newServiceProvider?.id,
      ServiceProviderName: await newServiceProvider?.label,
      ExpenseID: await newExpenseList?.id,
      ExpenseDescription: await newExpenseList?.label,
      ExpenseDate: new Date(Date.now()),
      ExpenseAmount: data.get("ExpenseAmount"),
      OperationNumber: await newOperation?.id,
      Remark: data.get("Remark"),
    }
    console.log(expense)
    await createExpense(expense, localStorage.getItem("token")).then((res) => res).then((res) => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, { variant: "success" });
      refetch();
    });
  }

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const expense = {
      intAutoID: editExpense.intAutoID,
      ServiceProviderID: editExpense?.ExpenseID,
      ServiceProviderName: editExpense?.ServiceProviderName,
      ExpenseID: editExpense?.ExpenseID,
      ExpenseDescription: editExpense?.ExpenseDescription,
      ExpenseDate: new Date(Date.now()),
      ExpenseAmount: data.get("ExpenseAmount"),
      OperationNumber: editExpense?.OperationNumber,
      Remark: data.get("Remark"),
    };
    await updateExpense(localStorage.getItem("token"), expense).then((res) => res).then((res) => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, { variant: "success" });
      refetch();
    });
    setEditOpen(false);
  }

  async function handleDelete() { }

  function addExpenseToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreateOpen}
          components={{
            Toolbar: addExpenseToolBar,
          }}
        >
          Add Expense
        </Button>
      </GridToolbarContainer>
    );
  }

  const expenseForm = [
    {
      label: "ExpenseAmount",
      name: 'ExpenseAmount',
      type: 'numeric',
      defaultValue: editExpense ? editExpense?.Amount : ''
    },
    {
      label: "Remark",
      name: 'Remark',
      defaultValue: editExpense ? editExpense?.Remark : ''
    }
  ]

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
      renderCell: (params) => {
        async function handleDelete() {
          await deleteExpense(localStorage.getItem("token"), params.row.intAutoID).then(res => {
            const responseMessage = res;
            enqueueSnackbar(responseMessage.Message, {
              variant: "success",
            });
            refetch();
          })
        }

        async function handleEdit() {
          const rowData = params.row;
          setEditExpense(rowData);
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
        );
      },
    },
  ];

  const { isLoading, error, data, refetch } = useQuery('expense', () =>
    getExpense(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setExpenses(data.map((expense, i) => ({ id: i, ...expense })));
    };

    getCustomers(localStorage.getItem("token")).then((res) => res).then((res) => {
      setCustomers(res.map((customer) => ({ id: customer.CustomerID, label: customer.CustomerName })));
    });

    getOperations(localStorage.getItem("token")).then((res) => res).then((res) => {
      setOperations(res.map((operation) => ({ id: operation.OperationNumber, label: operation.OperationNumber })));
    });

    getServceProvider(localStorage.getItem("token")).then((res) => res).then((res) => {
      setServiceProvider(res.map((serviceProvider) => ({ id: serviceProvider.ServiceProviderID, label: serviceProvider.ServiceProviderName })));
    });

    getExpenseList(localStorage.getItem("token")).then((res) => res).then((res) => {
      setExpenseList(res.map((expense) => ({ id: expense.ExpenseID, label: expense.ExpenseDescription })));
      console.log("Expense List", res)
    });

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
          Toolbar: addExpenseToolBar,
        }}
        loading={isLoading}
        pageSize={12}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
      />
      {/* create commodity */}
      <CustomeDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleSubmit={handleCreate}
        title={'Add Expense'}
        submitText={'create commodity'}
        cancelText={'cancel'}
        formData={expenseForm}
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
              setNewExpenseList(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={expenseList}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="Expense List" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            onChange={(event, newValue) => {
              setNewServiceProvider(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={serviceProvider}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="service provider" />}
          />
        </Grid>
      </CustomeDialog>

      {/* edit modal */}
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Update Expense'}
        submitText={'update commodity'}
        cancelText={'cancel'}
        formData={expenseForm}
      >
        <Grid item xs={6} >
          <Autocomplete
            value={editExpense?.OperationNumber}
            onChange={(event, newValue) => {
              setNewOperation(newValue);
              editExpense.OperationNumber = newValue.id;
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
            value={editExpense?.ExpenseDescription}
            onChange={(event, newValue) => {
              setNewExpenseList(newValue);
              editExpense.ExpenseDescription = newValue.label;
            }}
            disablePortal
            id="combo-box-demo"
            options={expenseList}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="Expense List" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            value={editExpense?.ServiceProviderID}
            onChange={(event, newValue) => {
              setNewServiceProvider(newValue);
              editExpense.ServiceProviderID = newValue.id;
            }}
            disablePortal
            id="combo-box-demo"
            options={serviceProvider}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="service provider" />}
          />
        </Grid>
      </CustomeDialog>

      {/* delete */}
      <Dialog onClose={handleDeleteClose} open={openDelete}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {deleteMessage}
        </Typography>
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>yes</Button>
        <Button variant='contained' onClick={handleDeleteClose}>no</Button>
      </Dialog>
    </Paper>
  );
}
