import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Autocomplete, Avatar, Button, Grid, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { changeStatusUser, createUser, getUsers, uploadPicture, updateUser } from '../api/users';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { PHOTOS_BASE } from '../api/base';
import CustomeDialog from '../components/CustomDialog';

export default function Users() {
    const { enqueueSnackbar } = useSnackbar();
    const [userData, setUserData] = useState(null);
    const [userRole, setNewUserRole] = useState('');
    const [userImage, setUserImage] = useState(null);
    const [userImagePathName, setUserImagePathName] = useState(null);

    // create modal
    const [createOpen, setCreateOpen] = useState(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);
    // update modal
    const [editOpen, setEditOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
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
            headerName: 'UserName',
            width: 150,
            renderCell: (params) => {
                // UserImagePath
                return <Stack direction={'row'} spacing={2} alignItems='center'><Avatar src={`${PHOTOS_BASE}${params.row?.UserImagePath.split('"').join('')} `} /><Typography>{params.row.UserName}</Typography></Stack>
            }
        },
        {
            field: "FullName",
            headerName: "Full Name",
            width: 150,
        },
        {
            field: "Email",
            headerName: "Email",
            width: 150,
        },
        {
            field: "UserRole",
            headerName: "User Role",
            width: 150,
        },
        {
            field: 'IsActive',
            headerName: 'Is Active',
            renderCell: (params) => {
                return <Switch
                    checked={params.row.IsActive === 'True' ? true : false}
                    onChange={async () => {
                        await changeStatusUser(localStorage.getItem('token'), params.row.UserID);
                        refetch();
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            }
        },
        {
            field: "createdAt",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => {
                async function editRow() {
                    const rowData = params.row;
                    setEditUser(rowData);
                    handleEditOpen();
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
                    </>
                )
            }
        }
    ]



    // create user
    async function handleCreate(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (userImage) {
            await uploadPicture(userImage, localStorage.getItem('token')).then(res => {
                const responseMessage = res;
                console.log(responseMessage)
                setUserImagePathName(responseMessage.replace('/"/g', '').replace('"/g', ''))
            }).then(res => {
                const user = {
                    UserName: formData.get('UserName'),
                    FullName: formData.get("FullName"),
                    UserRole: userRole,
                    Email: formData.get('Email'),
                    Password: formData.get('Password'),
                    UserImagePath: userImagePathName ? userImagePathName.replace('"/g', '') : '',
                }
                createUser(localStorage.getItem("token"), user).then(res => {
                    const responseMessage = res;
                    enqueueSnackbar(responseMessage.Message, {
                        variant: res.ID === 1 ? 'error' : 'success',
                    });
                    handleCreateClose();
                    refetch();
                })
            })
        } else {
            const user = {
                UserName: formData.get('UserName'),
                FullName: formData.get("FullName"),
                UserRole: userRole,
                Email: formData.get('Email'),
                Password: formData.get('Password'),
                UserImagePath: userImagePathName ? userImagePathName : '',
            }
            createUser(localStorage.getItem("token"), user).then(res => {
                const responseMessage = res;
                enqueueSnackbar(responseMessage.Message, {
                    variant: "success",
                });
                handleCreateClose();
                refetch();
            })
        }
    }

    // edit user
    async function handleEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const user = {
            UserID: editUser.UserID,
            IsActive: editUser.IsActive,
            UserName: formData.get('UserName'),
            FullName: formData.get("FullName"),
            UserRole: userRole ? userRole : editUser.UserRole,
            Email: formData.get('Email'),
        }

        await updateUser(localStorage.getItem("token"), user).then(res => {
            const responseMessage = res;
            enqueueSnackbar(responseMessage.Message, {
                variant: "success",
            });
            handleEditClose();
            refetch();
        })
    }

    function addToolBar() {
        return (
            <GridToolbarContainer>
                <Button
                    color="primary"
                    startIcon={<Add />}
                    variant="contained"
                    onClick={handleCreateOpen}
                >
                    Create User
                </Button>
            </GridToolbarContainer>
        );
    }

    const userForm = [
        {
            label: 'User Name',
            name: 'UserName',
            defaultValue: editUser ? editUser.UserName : '',
        },
        {
            label: 'Full Name',
            name: 'FullName',
            defaultValue: editUser ? editUser.FullName : '',
        },
        {
            label: 'Email',
            name: 'Email',
            defaultValue: editUser ? editUser.Email : '',
        },
    ]
    const { isLoading, error, data, refetch } = useQuery('users', () =>
        getUsers(localStorage.getItem('token')).then((res) => res)
    )

    useEffect(() => {
        if (data) {
            setUserData(data.map((user, i) => ({ id: i, ...user })));
            console.log(data)
        }
    }, [data])

    console.log(userData?.map(user => user.UserImagePath.split('"').join('')))

    return (
        <Paper sx={{ p: 2 }}>
            <DataGrid
                style={{ minHeight: "68vh", border: "none" }}
                rows={userData?.filter(user => user.UserName !== 'admin')}
                columns={columns}
                components={{
                    Toolbar: addToolBar,
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
                title={'Add A New user'}
                submitText={'create user'}
                cancelText={'cancel'}
                formData={userForm}
            >
                <Grid item xs={6} >
                    {/* image upload */}
                    <TextField sx={{ pt: 2 }} type="file" id="file" name="file" onChange={(e) => {
                        setUserImage(e.target.files[0])
                    }} />
                </Grid>
                <Grid item xs={6} >
                    <Autocomplete
                        value={editUser?.UserRole}
                        onChange={(event, newValue) => {
                            setNewUserRole(newValue);
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Administrator', 'OperationHead', 'Assessor', "TransitOfficer"]}
                        sx={{ pt: 2 }}
                        renderInput={(params) => <TextField {...params} required label="User Role" />}
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextField margin='normal' required fullWidth label={'Password'} name={'Password'} />
                </Grid>
            </CustomeDialog>

            {/* create customer */}
            <CustomeDialog
                open={editOpen}
                handleClose={handleEditClose}
                handleSubmit={handleEdit}
                title={'Edit User'}
                submitText={'edit user'}
                cancelText={'cancel'}
                formData={userForm}
            >
                <Grid item xs={6} >
                    <Autocomplete
                        value={editUser?.UserRole}
                        onChange={(event, newValue) => {
                            setNewUserRole(newValue);
                            editUser.UserRole = newValue;
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Administrator', 'OperationHead', 'Assessor', "TransitOfficer"]}
                        sx={{ pt: 2 }}
                        renderInput={(params) => <TextField {...params} required label="User Role" />}
                    />
                </Grid>
            </CustomeDialog>
        </Paper>
    )
}
