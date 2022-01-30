import { Delete, Done, DoneAll, DoneOutline, Folder, Inventory2, PaidOutlined, PeopleAltOutlined, Report, Settings, SettingsAccessibility } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CardMedia, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material';
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#4156cc',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Dashboard() {
    const topCardData = [
        {
            title: "Customers",
            data: "1,212",
            icon: <PeopleAltOutlined fontSize='large' />,
        },
        {
            title: "Expenses",
            data: "21,242",
            icon: <PaidOutlined fontSize='large' />,
        },
        {
            title: "Operations",
            data: "241,4423",
            icon: <Settings fontSize='large' />,
        },

        {
            title: "Commoditys",
            data: "2,124,124",
            icon: <Inventory2 fontSize='large' />,
        },
    ];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('#123123', 159, 6.0, 24, 4.0),
        createData('#4324321', 237, 9.0, 37, 4.3),
        createData('#2412431', 262, 16.0, 24, 6.0),
        createData('#4412412', 305, 3.7, 67, 4.3),
        createData('#5234232', 356, 16.0, 49, 3.9),
    ];

    return <div>
        <Grid container spacing={3} justifyContent={"space-between"}>
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
                                <Typography variant="h6">
                                    {data.title}
                                </Typography>
                                <Typography variant="h4">{data.data}</Typography>
                            </CardContent>
                            <CardMedia>
                                <Box
                                    mr={4}
                                >
                                    {data.icon}
                                </Box>
                            </CardMedia>
                        </Card>
                    </Grid>
                );
            })}
            <Grid item xs={12} sm={6} >
                <Paper sx={{ p: 3 }} elevation={0}>
                    <Typography gutterBottom variant="h6" component="h2">
                        Operations
                    </Typography>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Opp. No</StyledTableCell>
                                    <StyledTableCell align="right">Date</StyledTableCell>
                                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                                    <StyledTableCell align="right">Customer Name</StyledTableCell>
                                    <StyledTableCell align="right">Balance</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} >
                <Paper sx={{ p: 3 }} elevation={0}>
                    <Typography gutterBottom variant="h6" component="h2">
                        Customer
                    </Typography>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Opp. No</StyledTableCell>
                                    <StyledTableCell align="right">Date</StyledTableCell>
                                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                                    <StyledTableCell align="right">Customer Name</StyledTableCell>
                                    <StyledTableCell align="right">Balance</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} >
                <Paper sx={{ p: 3 }} elevation={0}>
                    <Typography gutterBottom variant="h6" component="h2">
                        Service Provider
                    </Typography>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Opp. No</StyledTableCell>
                                    <StyledTableCell align="right">Date</StyledTableCell>
                                    <StyledTableCell align="right">Customer ID</StyledTableCell>
                                    <StyledTableCell align="right">Customer Name</StyledTableCell>
                                    <StyledTableCell align="right">Balance</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} >
                <Paper sx={{ p: 3 }} elevation={0}>
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
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
                        {todoList.map((list) => {
                            return (
                                <ListItem
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" aria-label="delete" sx={{ mr: 1 }}>
                                                <Done />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <Delete />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Folder />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant='h6'>{list.title}</Typography>}
                                        secondary={<Typography variant='body1' color='GrayText'>{list.subtitle}</Typography>}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </div>;
}


const todoList = [
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    },
    {
        title: 'submit invoice to hr manager',
        subtitle: 'invoice starting from date 21 to 23 havent been submitted for a reivew by the hr manager complete this task before 21 may or else you are fired'
    }
]