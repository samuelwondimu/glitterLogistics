import {
  Add,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { createCommodity, deleteCommodity, getCommodity, updateCommodity, updateConfirmDelete } from "../api/commodity";
import CustomeDialog from "../components/CustomDialog";

export default function Commodity() {
  const [commodities, setCommodities] = useState([]);
  const { enqueueSnackbar } = useSnackbar();


  // handle create customer
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // handle delete modal
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteCommoditydata, setDeleteCommoditydata] = useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  // handle edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editCommodity, setEditCommodity] = useState(null);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditCommodity(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "CommodityName",
      headerName: "Commodity name",
      width: 150,
    },
    {
      field: "Category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "HSCode",
      headerName: "HS Code",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        async function handleDelete() {
          const rowData = params.row;
          await deleteCommodity(localStorage.getItem('token'), params.row.CommodityID).then(res => {
            const responseMessage = res
            if (responseMessage.ID === 2) {
              setDeleteCommoditydata(rowData);
              handleDeleteOpen();
              setDeleteMessage(responseMessage.Message)
            } else if (responseMessage.ID === 0) {
              enqueueSnackbar(responseMessage.Message);
              refetch();
            }
          })
        }
        async function handleEdit() {
          const rowData = params.row;
          setEditCommodity(rowData);
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


  const commodityForm = [
    {
      label: 'Commodity Name',
      name: 'CommodityName',
      defaultValue: editCommodity ? editCommodity?.CommodityName : ''
    },
    {
      label: 'Category',
      name: 'Category',
      defaultValue: editCommodity ? editCommodity?.Category : ''
    },
    {
      label: 'HS Code',
      name: 'HsCode',
      type: 'numeric',
      defaultValue: editCommodity ? editCommodity?.HSCode : ''
    }
  ]

  const { isLoading, error, data, refetch } = useQuery('commodity', () =>
    getCommodity(localStorage.getItem('token')).then((res) => res)
  )

  function addToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<Add />}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleCreateOpen}
        >
          New Commodity Provider
        </Button>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    if (data) {
      console.log("Commodoity", data?.map((commodity, i) => ({ id: i, HSCode: commodity.HSCode, ...commodity })))
      setCommodities(data?.map((commodity, i) => ({ id: i, HSCode: commodity.HSCode, ...commodity })));
    }
  }, [data]);

  async function handleCreate(event) {
    event.preventDefault();
    setEditCommodity(null);
    const data = new FormData(event.target);
    const commodity = {
      CommodityName: data.get("CommodityName"),
      Category: data.get("Category"),
      HSCode: data.get("HsCode"),
    };

    createCommodity(commodity, localStorage.getItem('token')).then((res) => res).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, { variant: 'success' });
      refetch()
    })
    setCreateOpen(false);
  }

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const commodity = {
      CommodityID: editCommodity?.CommodityID,
      CommodityName: data.get("CommodityName"),
      Category: data.get("Category"),
      HSCode: data.get("HsCode"),
    };
    await updateCommodity(localStorage.getItem('token'), commodity).then((res) => res).then(res => {
      const responseMessage = res;
      enqueueSnackbar(responseMessage.Message, { variant: 'success' });
      refetch()
    })
    setEditCommodity(null);
    setEditOpen(false);
  }

  async function handleDelete() {
    await updateConfirmDelete(localStorage.getItem("token"), deleteCommoditydata?.CommodityID).then((res) => {
      const responseMessage = res
      enqueueSnackbar(responseMessage.Message);
      refetch();
    })
    setOpenDelete(false);
  }

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography fontWeight={"bold"} gutterBottom>
          Commodity
        </Typography>

        <DataGrid
          style={{ minHeight: "68vh", border: "none" }}
          rows={commodities}
          columns={columns}
          components={{
            Toolbar: addToolBar,
          }}
          pageSize={12}
          loading={isLoading}
          rowsPerPageOptions={[8]}
          disableSelectionOnClick
        />
        <CustomeDialog
          open={createOpen}
          handleClose={handleCreateClose}
          handleSubmit={handleCreate}
          title={'Add Commodity'}
          submitText={'create commodity'}
          cancelText={'cancel'}
          formData={commodityForm}
        />

        {/* edit modal */}
        <CustomeDialog
          open={editOpen}
          handleClose={handleEditClose}
          handleSubmit={handleEdit}
          title={'Update Commodity'}
          submitText={'update commodity'}
          cancelText={'cancel'}
          formData={commodityForm}
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
    </>
  );
}
