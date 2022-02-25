import {
  Button,
  Dialog,
  Paper,
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
import CustomeDialog from "../components/CustomDialog";

export default function Expense() {
  const [expenses, setExpenses] = useState(null)
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
    console.log(data);
  }

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
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
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    },
    {
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    },
    {
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    },
    {
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    },
    {
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    }, {
      field: "OperationNumber",
      headerName: 'Operation Number',
      defaultValue: deleteExpensedata ? deleteExpensedata?.OperationNumber : ''
    }
  ]

  const { isLoading, error, data } = useQuery('expense', () =>
    getExpense(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setExpenses(data.map((expense) => ({ id: expense.ExpenseID, ...expense })));
    };
  }, [data]);


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
      />

      {/* edit modal */}
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Update Expense'}
        submitText={'update commodity'}
        cancelText={'cancel'}
        formData={expenseForm}
      />

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
