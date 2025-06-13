import { faker } from '@faker-js/faker';
import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { v4 as uuidv4 } from 'uuid';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const TablePage = () => {
  const data = useMemo<Person[]>(() => {
    return Array(100)
      .fill(null)
      .map(() => {
        return {
          age: Math.floor(Math.random() * 80) + 18,
          firstName: faker.person.firstName(),
          id: uuidv4(),
          lastName: faker.person.lastName(),
          progress: Math.floor(Math.random() * 100),
          status: Math.floor(Math.random() * 10) % 2 ? 'married' : 'single',
          visits: Math.floor(Math.random() * 100),
        };
      });
  }, []);

  const columnHelper = createColumnHelper<Person>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('visits', {
        header: 'Visits',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => (
          <Badge variant={info.getValue() === 'married' ? 'default' : 'secondary'}>{info.getValue()}</Badge>
        ),
      }),
      columnHelper.accessor('progress', {
        header: 'Progress',
        cell: info => (
          <div className="h-2.5 w-full rounded-full bg-secondary">
            <div className="h-2.5 rounded-full bg-primary" style={{ width: `${info.getValue()}%` }}></div>
          </div>
        ),
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>User Data Table</CardTitle>
          <CardDescription>A list of users with their details and progress information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablePage;
