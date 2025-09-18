import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Table, type TableColumn, TablePagination, TableSkeleton } from "@/components/ui/table";

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: User[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Admin" },
  { id: 2, name: "Mike Chen", email: "mike@example.com", role: "Editor" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "Viewer" },
  { id: 4, name: "John Smith", email: "john@example.com", role: "Editor" },
  { id: 5, name: "Jane Doe", email: "jane@example.com", role: "Admin" },
];

export default function TableExamples() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | false>("asc");
  const [loading, setLoading] = useState(false);

  const columns: TableColumn<User>[] = [
    { id: "name", label: "Name", dataKey: "name", sortable: true, minWidth: 150 },
    { id: "email", label: "Email", dataKey: "email", minWidth: 200 },
    { id: "role", label: "Role", dataKey: "role", sortable: true, minWidth: 120 },
  ];

  // Sorting logic
  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortBy || !sortDirection) return 0;
    const valA = (a as any)[sortBy];
    const valB = (b as any)[sortBy];
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginated data
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Table Component Demo
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setLoading((prev) => !prev)}
          sx={{ mr: 2 }}
        >
          {loading ? "Stop Loading" : "Simulate Loading"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSelected([])}
          disabled={selected.length === 0}
        >
          Clear Selection ({selected.length})
        </Button>
      </Box>

      <Table<User>
        columns={columns}
        data={paginatedData}
        loading={loading}
        loadingRows={3}
        selectable
        selected={selected}
        onSelectionChange={setSelected}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(col, dir) => {
          setSortBy(col);
          setSortDirection(dir);
        }}
        striped
        hoverable
        clickableRows
        onRowClick={(row) => alert(`Clicked row: ${row.name}`)}
        emptyState={<Typography>No users found.</Typography>}
        variant="outlined"
        size="medium"
        stickyHeader
        maxHeight={300}
      />

      {loading ? (
        <Box sx={{ mt: 2 }}>
          <TableSkeleton columns={3} rows={3} showHeader showCheckbox />
        </Box>
      ) : (
        <TablePagination
          count={sampleData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={[3, 5, 10]}
          showFirstLastButtons
        />
      )}
    </Container>
  );
}
