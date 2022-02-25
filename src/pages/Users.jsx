import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { getUsers } from '../api/users';
import { GridToolbarContainer } from '@mui/x-data-grid';

export default function Users() {
    const { enqueueSnackbar } = useSnackbar();
    const [userData, setUserData] = useState([]);

    // create modal
    const [createOpen, setCreateOpen] = useState(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);
    // update modal
    const [editOpen, setEditOpen] = useState(false);
    const [editPort, setEditUser] = useState(null);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => {
        setEditOpen(false);
        setEditUser(null);
    };
    // delete modal
    // TODO:

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: "createdAt",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => {
                async function editRow() { }
                async function deleteRow() { }

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
                )
            }
        }
    ]

    const { isLoading, error, data, refetch } = useQuery('users', () =>
        getUsers(localStorage.getItem('token')).then((res) => res)
    )

    // create user
    const handleCreate = (event) => { }

    // edit user
    const handleEdit = () => { }

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data])

    function addUsersToolBar() {
        return (
            <GridToolbarContainer>
                <Button
                    color="primary"
                    startIcon={<Add />}
                    variant="contained"
                    onClick={handleCreateOpen}
                >
                    Add Port
                </Button>
            </GridToolbarContainer>
        );
    }

    const userForm = [
        {
            label: '',
            name: '',
            defaultValue: ''
        }
    ]

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>Users</div>
    )
}
