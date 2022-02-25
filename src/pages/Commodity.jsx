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
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCommodity } from "../api/commodity";
import CustomeDialog from "../components/CustomDialog";

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

export default function Commodity() {
  const [commodities, setCommodities] = useState(null);

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

  function addCommodityToolBar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreateOpen}
          components={{
            Toolbar: addCommodityToolBar,
          }}
        >
          Add Commodity
        </Button>
      </GridToolbarContainer>
    );
  }

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
      defaultValue: editCommodity ? editCommodity?.HsCode : ''
    }
  ]

  const { isLoading, error, data } = useQuery('commodity', () =>
    getCommodity(localStorage.getItem('token')).then((res) => res)
  )

  useEffect(() => {
    setCommodities(data?.map((commodity) => ({ id: commodity.CommodityID, ...commodity })));
  }, [data]);

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
            Toolbar: addCommodityToolBar,
          }}
          pageSize={12}
          loading={isLoading}
          rowsPerPageOptions={[8]}
          disableSelectionOnClick
        />
        {/* create commodity */}
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {deleteMessage}
          </Typography>
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>yes</Button>
          <Button variant='contained' onClick={handleDeleteClose}>no</Button>
        </Dialog>
      </Paper>
    </>
  );
}
