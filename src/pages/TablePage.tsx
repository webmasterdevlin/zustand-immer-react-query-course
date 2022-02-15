import React, { useEffect, useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const TablePage = () => {
  const data = useMemo(
    () => [
      ...Array(100)
        .fill(null)
        .map(i => ({
          id: uuidv4(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: Math.floor(Math.random() * 80) + 18,
          visits: Math.floor(Math.random() * 100),
          progress: Math.floor(Math.random() * 10),
          status: Math.floor(Math.random() * 10) & 2 ? 'married' : 'single',
        })),
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  );

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    console.table(data);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePage;
