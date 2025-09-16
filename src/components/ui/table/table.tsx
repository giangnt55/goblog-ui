import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  type TableCellProps,
} from "@mui/material";
import { type ReactNode } from "react";

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: TableCellProps["align"];
};

type Props<T> = {
  columns: Column[];
  rows: T[];
  renderCell: (row: T, column: Column) => ReactNode;
};

export function Table<T>({ columns, rows, renderCell }: Props<T>) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <MuiTable>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(45deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))",
            }}
          >
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align}
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              hover
              sx={{
                transition: "0.2s",
                "&:hover": {
                  background: "rgba(25,118,210,0.05)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                >
                  {renderCell(row, col)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
