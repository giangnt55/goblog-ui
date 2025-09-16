import { Box, Container, Stack, Typography } from "@mui/material";
import { Button, Link, Card, FeatureCard, StatCard, TestimonialCard, Tooltip, 
  Spinner, Skeleton, Table, TableSkeleton, Pagination } from "@/components/ui"
import { useState } from "react";

export default function UiShowcasePage() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = [
    { id: "name", label: "Name" },
    { id: "role", label: "Role" },
    { id: "age", label: "Age" }
  ];

  const rows = [
    { name: "Sarah Johnson", role: "Tech Blogger", age: 29 },
    { name: "Mike Chen", role: "Content Creator", age: 34 },
    { name: "Emily Davis", role: "Digital Marketer", age: 27 },
    { name: "John Smith", role: "Engineer", age: 31 },
    { name: "Jane Doe", role: "Designer", age: 26 },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        UI Components Showcase
      </Typography>

      {/* Buttons */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Buttons</Typography>
        <Stack direction="row" spacing={2}>
          <Button customVariant="primary">Primary</Button>
          <Button customVariant="outline">Outline</Button>
        </Stack>
      </Box>

      {/* Links */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Links</Typography>
        <Stack direction="row" spacing={2}>
          <Link href="#features">Internal</Link>
          <Link href="https://google.com" target="_blank">External</Link>
        </Stack>
      </Box>

      {/* Cards */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Cards</Typography>
        <Stack direction="row" spacing={2}>
          <Card sx={{ p: 3, maxWidth: 250 }}>
            <Typography>Basic Card</Typography>
          </Card>
          <FeatureCard icon="✍️" title="Rich Editor" desc="Markdown & live preview." />
          <StatCard value="10K+" label="Active Writers" />
          <TestimonialCard
            content="GoBlog has transformed how I write."
            author="Sarah Johnson"
            role="Tech Blogger"
            avatar="S"
          />
        </Stack>
      </Box>

      {/* Tooltip */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Tooltip</Typography>
        <Tooltip title="Hello!">
          <Button customVariant="primary">Hover me</Button>
        </Tooltip>
      </Box>

      {/* Spinner */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Spinner</Typography>
        <Spinner />
      </Box>

      {/* Skeleton */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Skeleton</Typography>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={200} height={100} />
        </Stack>
      </Box>

      {/* Table */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Table</Typography>
        <Table
          columns={columns}
          rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          renderCell={(row, col) => (row as any)[col.id]}
        />
        <Pagination
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>

      {/* Skeleton Table */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Table Skeleton</Typography>
        <TableSkeleton columns={2} rows={3} />
      </Box>
    </Container>
  );
}