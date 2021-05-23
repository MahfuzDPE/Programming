import React from 'react';
import { TableSortLabel, TableBody, TableRow, TableCell, TableContainer, TableHead } from '@material-ui/core';

export default function TableHeader(props) {
    const { valueToOrderBy,orderDirection,handleRequestSort }=props
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
      
    return (
        <TableHead>
     

        <TableRow>
            <TableCell key="name">
                <TableSortLabel
                    active={valueToOrderBy === "name"}
                    direction={valueToOrderBy === "name" ? orderDirection : 'asc'}
                onClick={createSortHandler("name")}
                > CUSTOMER NAME</TableSortLabel>
            </TableCell>
            <TableCell key="address">
                <TableSortLabel
                    active={valueToOrderBy === "address"}
                    direction={valueToOrderBy === "address" ? orderDirection : 'desc'}
                onClick={createSortHandler("address")}

                > CUSTOMER ADDRESS</TableSortLabel>
            </TableCell>
            {/* <TableCell>ACTION</TableCell> */}
        </TableRow>
                        </TableHead >


    )
}