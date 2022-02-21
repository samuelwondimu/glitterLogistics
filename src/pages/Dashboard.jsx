import {
  Delete,
  Done,
  DoneAll,
  DoneOutline,
  Folder,
  Inventory2,
  PaidOutlined,
  PeopleAltOutlined,
  Receipt,
  Report,
  Settings,
  SettingsAccessibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCurrenUser } from "../api/auth";
import { getReports } from "../api/report";
import { getTodos } from "../api/todo";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [reports, setReports] = useState(null);
  const [todos, setTodos] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const topCardData = [
    {
      title: "Operations",
      data: reports?.Operation,
      icon: <Settings fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Customers",
      data: reports?.Customer,
      icon: <PeopleAltOutlined fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: 'Service Provider',
      data: reports?.ServiceProvider,
      icon: <SettingsAccessibility fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Invoices",
      data: reports?.Invoice,
      icon: <Receipt fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />
    }


  ];

  const topcardCollapsed = [
    {
      title: "Ports",
      data: reports?.Ports,
      icon: <Folder fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Expenses",
      data: reports?.Expense,
      icon: <PaidOutlined fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Commoditys",
      data: reports?.Commodity,
      icon: <Inventory2 fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
    {
      title: "Cash Collection",
      data: reports?.CashCollection,
      icon: <Done fontSize="large" sx={{ background: 'orange', color: 'white', p: 0.5, borderRadius: 1 }} />,
    },
  ]

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("#123123", 159, 6.0, 24, 4.0),
    createData("#4324321", 237, 9.0, 37, 4.3),
    createData("#2412431", 262, 16.0, 24, 6.0),
    createData("#4412412", 305, 3.7, 67, 4.3),
    createData("#5234232", 356, 16.0, 49, 3.9),
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    getCurrenUser(token).then((res) => {
      setUser(res);
    });

    getReports(token).then((res) => {
      console.log(res);
      setReports(res[0]);
    });

    getTodos(token).then((res) => {
      console.log(res);
      setTodos(res);
    });
  }, [])

  console.log("CURRENT USER", user);
  console.log("REPORTS", reports);
  console.log("TODOS", todos);

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
                    <Box mr={4}>{data.icon}</Box>
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
                    <StyledTableCell>Opp. No</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Customer Name
                    </StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.protein}
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
                    <StyledTableCell>Opp. No</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Customer Name
                    </StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.protein}
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
                    <StyledTableCell>Opp. No</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Customer Name
                    </StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.protein}
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
              <FormControl sx={{ width: 2 / 4 }}>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={sort}
                  label="TODO"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Task</MenuItem>
                  <MenuItem value={20}>Appointement</MenuItem>
                  <MenuItem value={30}>Phone Call</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <List dense>
              {todos.map((list, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{list.title}</Typography>
                      }
                      secondary={list.subtitle.slice(0, 150)}
                      sx={{ mr: -1 }}
                    />
                    <ListItemAvatar>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{
                          mr: 1,
                          backgroundColor: "green",
                          color: "white",
                        }}
                      >
                        <Done />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{ backgroundColor: "red", color: "white" }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemAvatar>
                    <Divider sx={{ my: 1 }} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const todoList = [
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
  {
    title: "submit invoice to hr manager",
    subtitle:
      "invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired",
  },
];
