// components/ui/table/pagination.tsx
import { TablePagination, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

export function Pagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mt: 2,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        px: 2,
      }}
    >
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          "& .MuiTablePagination-toolbar": {
            gap: 2,
          },
          "& .MuiTablePagination-actions": {
            display: "flex",
            gap: 1,
          },
          "& .MuiSelect-select": {
            borderRadius: 2,
          },
        }}
        slotProps={{
          actions: {
            previousButton: {
              children: <ArrowBackIosNewIcon fontSize="small" />,
            },
            nextButton: {
              children: <ArrowForwardIosIcon fontSize="small" />,
            },
          },
        }}
      />
    </Box>
  );
}
