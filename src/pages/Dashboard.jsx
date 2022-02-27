import {
  Add as AddIcon,
  Anchor,
  Delete,
  Done,
  Inventory2,
  PaidOutlined,
  PeopleAltOutlined,
  Receipt,
  Settings,
  SettingsAccessibility,
} from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCurrenUser } from "../api/auth";
import { getCustomers } from "../api/customers";
import { getOperations } from "../api/operation";
import { getReports } from "../api/report";
import { getHomeCustomers, getHomeServiceProvider, getHomeOperationData } from '../api/home';
import { getServceProvider } from "../api/serviceprovider";
import { createTodoapi, getTodos, updateTodoapi } from "../api/todo";
import CustomeDialog from "../components/CustomDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [reports, setReports] = useState(null);
  const [todos, setTodos] = useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [createTodo, setCreateTodo] = useState(false);
  const [operations, setOperations] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [serviceProviders, setServiceProviders] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const handleCreateOpen = () => setCreateTodo(true);
  const handleCreateClose = () => setCreateTodo(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const topCardData = [
    {
      title: "Operations",
      data: reports?.Operation,
      icon: <Settings fontSize="large" sx={{ background: 'gray', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Customers",
      data: reports?.Customer,
      icon: <PeopleAltOutlined fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: 'Service Provider',
      data: reports?.ServiceProvider,
      icon: <SettingsAccessibility fontSize="large" sx={{ background: 'blue', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Invoices",
      data: reports?.Invoice,
      icon: <Receipt fontSize="large" sx={{ background: 'red', color: 'white', p: 0.5, borderRadius: 1 }} />
    }
  ];

  const topcardCollapsed = [
    {
      title: "Ports",
      data: reports?.Ports,
      icon: <Anchor fontSize="large" sx={{ background: 'pink', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Expenses",
      data: reports?.Expense,
      icon: <PaidOutlined fontSize="large" sx={{ background: 'green', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Commoditys",
      data: reports?.Commodity,
      icon: <Inventory2 fontSize="large" sx={{ background: 'purple', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Cash Collection",
      data: reports?.CashCollection,
      icon: <Done fontSize="large" sx={{ background: 'teal', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
  ]

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCurrenUser(token).then((res) => {
      setUser(res);
    });

    getReports(token).then((res) => {
      setReports(res[0]);
    });

    getTodos(token).then((res) => {
      setTodos(res);
    });
  }, [])

  useEffect(() => {
    getHomeOperationData(localStorage.getItem('token')).then((res) => res).then(res => {
      setOperations(res);
    });
    getHomeCustomers(localStorage.getItem("token")).then((res) => res).then((res) => {
      setCustomers(res);
    });
    getHomeServiceProvider(localStorage.getItem("token")).then((res) => res).then((res) => {
      setServiceProviders(res);
    })
  }, []);

  async function handleCreatetodo(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      Subject: event.target.Subject.value,
      Notes: event.target.Notes.value,
      dueDate: dueDate,
      startDate: startDate,
      Status: 'Active',
    };
    console.log(data);
    await createTodoapi(data, token).then(res => {
      console.log(res);
      enqueueSnackbar("Todo Created", { variant: "success" });
      handleCreateClose();
    })
    getTodos(token).then((res) => {
      setTodos(res);
    });
    setStartDate(null);
    setDueDate(null);
    setCreateTodo(false);
  }

  return (
    <div>
      <Grid container spacing={3} justifyContent={"space-between"}>
        <Grid item md={12} container spacing={3}>
          {/* Top Card data */}
          {topCardData.map((data) => {
            return (
              <Grid item xs={12} sm={3} key={data.title}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                  elevation={0}
                >
                  <CardContent>
                    <Typography variant="h6">{data.title}</Typography>
                    <Typography variant="h4">{data.data}</Typography>
                  </CardContent>
                  <CardMedia>
                    <Box mr={4} >{data.icon}</Box>
                  </CardMedia>
                </Card>
              </Grid>
            );
          })}

          <Grid item md={12}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Grid item md={12} container spacing={3}>
                {topcardCollapsed.map((data) => {
                  return (
                    <Grid item xs={12} sm={3} key={data.title}>
                      <Card
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                        elevation={0}
                      >
                        <CardContent>
                          <Typography variant="h6">{data.title}</Typography>
                          <Typography variant="h4">{data.data}</Typography>
                        </CardContent>
                        <CardMedia>
                          <Box mr={4}>{data.icon}</Box>
                        </CardMedia>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Collapse>
          </Grid>
          <Grid item xs={12} justifyContent='flex-end'>
            <Button onClick={handleExpandClick} variant='contained'>{expanded ? 'close' : 'Show more'}</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }} elevation={0}>
            <Typography gutterBottom variant="h6" component="h2">
              Operations
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>OperationNumber</StyledTableCell>
                    <StyledTableCell >
                      Customer Name
                    </StyledTableCell>
                    <StyledTableCell >CommodityName</StyledTableCell>
                    <StyledTableCell >Load Port Name</StyledTableCell>
                    <StyledTableCell >Discharge Port Name</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operations?.slice(0, 5).map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {row.OperationType}
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.CustomerName}
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.CommodityName}
                      </StyledTableCell>
                      <StyledTableCell >{row.LoadPortName}</StyledTableCell>
                      <StyledTableCell >
                        {row.DischargePortName}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }} elevation={0}>
            <Typography gutterBottom variant="h6" component="h2">
              Customer
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Customer Name</StyledTableCell>
                    <StyledTableCell >Collected Amount</StyledTableCell>
                    <StyledTableCell >
                      Balance
                    </StyledTableCell>
                    <StyledTableCell >InvoiceAmount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers?.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell >
                        {row.CustomerName}
                      </StyledTableCell>
                      <StyledTableCell >{row.CollectedAmount}</StyledTableCell>
                      <StyledTableCell >
                        {row.Balance}
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.InvoiceAmount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }} elevation={0}>
            <Typography gutterBottom variant="h6" component="h2">
              Service Provider
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Service Provider Name</StyledTableCell>
                    <StyledTableCell >Expense Amount</StyledTableCell>
                    <StyledTableCell >Paid Amount</StyledTableCell>
                    <StyledTableCell >
                      Balance
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceProviders?.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {row.ServiceProviderName}
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.ExpenseAmount}
                      </StyledTableCell>
                      <StyledTableCell >{row.PaidAmount}</StyledTableCell>
                      <StyledTableCell >
                        {row.Balance}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }} elevation={0}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h6" component="h2">
                Todo List
              </Typography>
              <Button startIcon={<AddIcon />} variant='contained' onClick={handleCreateOpen}>Add Todo</Button>
            </Stack>
            <List dense>
              {todos?.map((list, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{list.Subject}</Typography>
                      }
                      secondary={list.Notes.slice(0, 150)}
                      sx={{ mr: -1 }}
                    />
                    <ListItemAvatar>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        varient='contained'
                        color='success'
                        sx={{
                          mr: 1,
                        }}
                        onClick={async () => {
                          await updateTodoapi(localStorage.getItem('token'), list.TaskID);
                          await getTodos(localStorage.getItem('token')).then((res) => {
                            console.log(res);
                            setTodos(res);
                          });
                          getTodos(localStorage.getItem('token')).then((res) => {
                            setTodos(res);
                          });
                        }}
                      >
                        <Done />
                      </IconButton>
                      {/* <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{ backgroundColor: "red", color: "white" }}
                      >
                        <Delete />
                      </IconButton> */}
                    </ListItemAvatar>
                    <Divider sx={{ my: 1 }} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <CustomeDialog
        open={createTodo}
        handleClose={handleCreateClose}
        handleSubmit={handleCreatetodo}
        title={'Create Todo'}
        submitText={'create todo'}
        cancelText={'cancel'}
        formData={[

        ]}
      >
        <Box />
        {/* date picker */}
        <Grid item xs={6} >
          <DesktopDatePicker
            sx={{ pt: 4 }}
            label="start date"
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={(value) => setStartDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={6} >
          <DesktopDatePicker
            sx={{ pt: 4 }}
            label="due date"
            inputFormat="MM/dd/yyyy"
            value={dueDate}
            onChange={(value) => setDueDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField margin='normal' required fullWidth label={'Subject'} name={"Subject"} />
        </Grid>
        <Grid item xs={12}>
          <TextField margin='normal' required fullWidth multiline rows={4} label={'Notes'} name={'Notes'} />
        </Grid>
      </CustomeDialog>
    </div>
  );
}