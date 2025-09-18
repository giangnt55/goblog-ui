import React from 'react';
import {
  TablePagination as MUITablePagination,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

export interface TablePaginationProps {
  /**
   * Total number of rows
   */
  count: number;
  /**
   * Current page (0-based)
   */
  page: number;
  /**
   * Number of rows per page
   */
  rowsPerPage: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Callback when rows per page changes
   */
  onRowsPerPageChange: (rowsPerPage: number) => void;
  /**
   * Available rows per page options
   */
  rowsPerPageOptions?: number[];
  /**
   * If true, shows the rows per page selector
   */
  showRowsPerPage?: boolean;
  /**
   * If true, shows first/last page buttons
   */
  showFirstLastButtons?: boolean;
  /**
   * Custom label for rows per page
   */
  rowsPerPageLabel?: string;
  /**
   * Variant of pagination
   */
  variant?: 'standard' | 'compact';
}

interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  showFirstLastButtons?: boolean;
}

const StyledPaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  minHeight: 52,
  gap: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const StyledCompactPagination = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  gap: theme.spacing(1),
}));

const PaginationActions: React.FC<PaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  showFirstLastButtons = true,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, totalPages - 1));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {showFirstLastButtons && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={isFirstPage}
          size="small"
          aria-label="first page"
        >
          <FirstPage />
        </IconButton>
      )}
      
      <IconButton
        onClick={handleBackButtonClick}
        disabled={isFirstPage}
        size="small"
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      
      <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center' }}>
        {totalPages === 0 ? '0 of 0' : `${page + 1} of ${totalPages}`}
      </Typography>
      
      <IconButton
        onClick={handleNextButtonClick}
        disabled={isLastPage}
        size="small"
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      
      {showFirstLastButtons && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={isLastPage}
          size="small"
          aria-label="last page"
        >
          <LastPage />
        </IconButton>
      )}
    </Box>
  );
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  showRowsPerPage = true,
  showFirstLastButtons = true,
  rowsPerPageLabel = 'Rows per page:',
  variant = 'standard',
}) => {
  const handlePageChange = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    onRowsPerPageChange(newRowsPerPage);
    onPageChange(0); // Reset to first page when changing rows per page
  };

  const startRow = count === 0 ? 0 : page * rowsPerPage + 1;
  const endRow = Math.min(count, (page + 1) * rowsPerPage);

  if (variant === 'compact') {
    return (
      <StyledCompactPagination>
        <Typography variant="body2" color="text.secondary">
          {count === 0 ? 'No records' : `${startRow}-${endRow} of ${count}`}
        </Typography>
        <PaginationActions
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          showFirstLastButtons={showFirstLastButtons}
        />
      </StyledCompactPagination>
    );
  }

  return (
    <StyledPaginationContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {count === 0 ? 'No records' : `${startRow}-${endRow} of ${count}`}
        </Typography>
        
        {showRowsPerPage && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {rowsPerPageLabel}
            </Typography>
            <FormControl size="small" variant="outlined">
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{ minWidth: 70 }}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      
      <PaginationActions
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        showFirstLastButtons={showFirstLastButtons}
      />
    </StyledPaginationContainer>
  );
};

TablePagination.displayName = 'TablePagination';