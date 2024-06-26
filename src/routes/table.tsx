import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

export const Route = createFileRoute('/table')({
  component: Table,
});

function Table() {
  const data = useMemo(() => {
    return [
      ...Array(100)
        .fill(null)
        .map(_ => {
          return {
            age: Math.floor(Math.random() * 80) + 18,
            firstName: faker.person.firstName(),
            id: uuidv4(),
            lastName: faker.person.lastName(),
            progress: Math.floor(Math.random() * 10),
            status: Math.floor(Math.random() * 10) & 2 ? 'married' : 'single',
            visits: Math.floor(Math.random() * 100),
          };
        }),
    ];
  }, []);

  const columns = React.useMemo(() => {
    return [
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
    ];
  }, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    console.table(data);
  }, [data]);

  return (
    <div className={'mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md dark:text-slate-900'}>
      <table className="min-w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  return (
                    <td {...column.getHeaderProps()}>
                      <p className={'mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'}>{column.render('Header')}</p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <th {...cell.getCellProps()}>{cell.render('Cell')}</th>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
