import { Report } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Grid, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
            icon: <Report />,
        },
        {
            title: "Expenses",
            data: "21,242",
            icon: <Report />,
        },
        {
            title: "Operations",
            data: "241,4423",
            icon: <Report />,
        },

        {
            title: "Commoditys",
            data: "2,124,124",
            icon: <Report />,
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
                <Paper sx={{ p: 3 }}>
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
                <Paper sx={{ p: 3 }}>
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
                <Paper sx={{ p: 3 }}>
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
                <Paper sx={{ p: 3 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        Todo List
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    </div>;
}
