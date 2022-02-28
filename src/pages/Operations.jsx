import { Add, DeleteOutline, EditOutlined, Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCommodity } from "../api/commodity";
import { getCustomers } from "../api/customers";
import { createOperation, deleteOperation, getOperations, updateOperations } from "../api/operation";
import { getPorts } from "../api/port";
import CustomeDialog from "../components/CustomDialog";

export default function Operations() {

  const [searchText, setSearchText] = React.useState('');
  const [operations, setOperations] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [commodity, setCommodity] = useState(null);
  const [ports, setPorts] = useState(null);
  const [dischargePort, setDischargePort] = useState(null);
  const [operationStatus, setOperationStatus] = useState('Draft');
  const [newPort, setNewPort] = useState(null);
  const [newCommodity, setNewCommodity] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // handle create operation
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // handle edit operation
  const [editOpen, setEditOpen] = useState(false);
  const [editOprationData, setEditOperationData] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOperationData(null);
    setEditOpen(false);
  };

  // handle delete operation
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "OperationType",
      headerName: "Operation Type",
      width: 100,
    },
    {
      field: 'StartDate',
      headerName: 'Start Date',
      width: 100,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      width: 100,
    },
    {
      field: "LoadPortName",
      headerName: "Load Port Name",
      width: 100,
    },
    {
      field: "DischargePortName",
      headerName: "Discharge Port Name",
      width: 150,
    },
    {
      field: "OperationType",
      headerName: "Operation Type",
      width: 50,
    },
    {
      field: "TypeOfDeclaration",
      headerName: "Type Of Declaration",
      width: 100,
    },
    {
      field: "OrderType",
      headerName: "Order Type",
      width: 150,
    },
    {
      field: "Remark",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "OperationStatus",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        async function handleEdit() {
          const rowData = params.row;
          handleEditOpen();
          console.log(rowData)
          setEditOperationData(rowData);
        };

        async function handleDelete() {
          await deleteOperation(localStorage.getItem("token"), params.row.id).then(res => {
            const responseMessage = res;
            if (responseMessage.ID === 0) {
              enqueueSnackbar("Operation deleted successfully", {
                variant: "success",
              });
              refetch();
            } else {
              handleDeleteOpen();
              setDeleteMessage(responseMessage.Message);
            }
          });
        };

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
      },
    },
  ];


  const { isLoading, error, data, refetch } = useQuery('operations', () =>
    getOperations(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    if (data) {
      setOperations(data.map((operation) => ({ id: operation.OperationNumber, ...operation })));
    };
    getCustomers(localStorage.getItem("token")).then((res) => res).then((res) => {
      setCustomers(res.map((customer) => ({ id: customer.CustomerID, label: customer.CustomerName })));
    });
    getCommodity(localStorage.getItem("token")).then((res) => res).then((res) => {
      setCommodity(res.map((commodity) => ({ id: commodity.CommodityID, label: commodity.CommodityName })))
    })
    getPorts(localStorage.getItem("token")).then((res) => res).then((res) => {
      setPorts(res.map((port) => ({ id: port.PortID, label: port.PortName })))
    })
  }, [data]);

  if (error) return 'An error has occurred: ' + error.message

  async function handleCreate(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const operation = {
      CustomerID: await newCustomer?.id,
      CustomerName: await newCustomer?.label,
      CommodityId: await newCommodity?.id,
      LoadPort: await newPort?.id,
      LoadPortName: await newPort?.label,
      DischargePortName: await newPort?.label,
      DischargePort: await dischargePort?.id,
      OperationNumber: data.get("OperationNumber"),
      OperationType: data.get("OperationType"),
      StartDate: new Date(Date.now()),
      OperationStatus: 'Active',
      TypeOfDeclaration: data.get("TypeOfDeclaration"),
      OrderType: data.get("OrderType"),
      Remark: data.get("Remark"),
    };
    await createOperation(operation, localStorage.getItem("token")).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, {
        variant: "success",
      });
      refetch();
      setCreateOpen(false);
    })
  }

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const operation = {
      CustomerID: editOprationData?.CustomerID,
      CommodityID: editOprationData?.CommodityID,
      LoadPort: editOprationData?.LoadPort,
      DischargePort: editOprationData?.DischargePort,
      OperationNumber: data.get("OperationNumber"),
      OperationType: data.get("OperationType"),
      TypeOfDeclaration: data.get("TypeOfDeclaration"),
      OrderType: data.get("OrderType"),
      Remark: data.get("Remark"),
      OperationStatus: operationStatus,
    };
    await updateOperations(localStorage.getItem("token"), operation).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, { variant: "success" });
      refetch();
      setEditOperationData(null);
    });
    setEditOpen(false);
    setEditOperationData(null);
  }

  async function handleDelete(operationId) { }

  const operationForm = [
    {
      label: 'Operation Type',
      name: 'OperationType',
      defaultValue: editOprationData ? editOprationData.OperationType : '',
    },
    {
      label: 'Operation Number',
      name: 'OperationNumber',
      type: 'numeric',
      defaultValue: editOprationData ? editOprationData.OperationNumber : '',
    },
    {
      label: 'Type Of Declaration',
      name: 'TypeOfDeclaration',
      defaultValue: editOprationData ? editOprationData.TypeOfDeclaration : '',
    },
    {
      label: 'Order Type',
      name: 'OrderType',
      defaultValue: editOprationData ? editOprationData.OrderType : '',
    },
    {
      label: 'Remark',
      name: 'Remark',
      defaultValue: editOprationData ? editOprationData.Remark : '',
    },
  ]

  console.log(newCustomer)
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = operations.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setOperations(filteredRows);
    if (searchValue === '') setOperations(operations)
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
        <Typography fontWeight={"bold"} gutterBottom>
          Operations
        </Typography>
        <Button
          color="primary"
          startIcon={<Add />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleCreateOpen}
        >
          New Operation
        </Button>
      </Stack>

      <DataGrid
        style={{ minHeight: "68vh", border: "none" }}
        rows={operations}
        columns={columns}
        components={{
          Toolbar: QuickSearchToolbar,
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => {
              requestSearch('')
              refetch()
            },
          }
        }}
        loading={isLoading}
        disableSelectionOnClick
      />
      {/* create dialog */}
      <CustomeDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleSubmit={handleCreate}
        title={'Create Operation'}
        submitText={'Create operation'}
        cancelText={'cancel'}
        formData={operationForm}
      >
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
        <Grid item xs={6} >
          <Autocomplete
            onChange={(event, newValue) => {
              setNewCommodity(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={commodity}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="commodity" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            onChange={(event, newValue) => {
              setNewPort(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={ports}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="load port" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            value={ports && ports[0]?.PortName}
            onChange={(event, newValue) => {
              setDischargePort(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={ports}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="dischargePort" />}
          />
        </Grid>
      </CustomeDialog>

      {/* edit modal */}
      <CustomeDialog
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEdit}
        title={'Update Operations'}
        submitText={'update Operation'}
        cancelText={'cancel'}
        formData={operationForm}
      >
        <Grid item xs={6} >
          <Autocomplete
            value={editOprationData?.CustomerName}
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
        <Grid item xs={6} >
          <Autocomplete
            value={editOprationData?.CommodityName}
            onChange={(event, newValue) => {
              setNewCommodity(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={commodity}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            value={editOprationData?.LoadPortName}
            onChange={(event, newValue) => {
              setNewPort(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={ports}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="load port" />}
          />
        </Grid>
        <Grid item xs={6} >
          <Autocomplete
            value={editOprationData?.DischargePortName}
            onChange={(event, newValue) => {
              setDischargePort(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={ports}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} required label="dischargePort" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            value={editOprationData?.OperationStatus}
            onChange={(event, newValue) => {
              setOperationStatus(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            name='operationStatus'
            options={['Active', 'Cancelled', 'Completed']}
            sx={{ pt: 2 }}
            renderInput={(params) => <TextField {...params} name='operationStatus' label="Operation Status" />}
          />
        </Grid>
      </CustomeDialog>

      {/* delete modal */}
      <Dialog onClose={handleDeleteClose} open={deleteOpen}>
        <Box p={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {deleteMessage}
          </Typography>
          <Box mt={2}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>yes</Button>
            <Button variant='contained' onClick={handleDeleteClose}>no</Button>
          </Box>
        </Box>
      </Dialog>
    </Paper>
  );
}


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
