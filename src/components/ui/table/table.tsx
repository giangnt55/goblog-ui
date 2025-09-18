import React from 'react';
import {
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  Checkbox,
  Paper,
  Typography,
  Box,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

export type SortDirection = 'asc' | 'desc' | false;

export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  id: string;
  /**
   * Display label for the column header
   */
  label: React.ReactNode;
  /**
   * Minimum width of the column
   */
  minWidth?: number | string;
  /**
   * Width of the column
   */
  width?: number | string;
  /**
   * Alignment for the column content
   */
  align?: 'left' | 'right' | 'center';
  /**
   * If true, the column can be sorted
   */
  sortable?: boolean;
  /**
   * Custom render function for the cell content
   */
  render?: (value: any, row: T, index: number) => React.ReactNode;
  /**
   * Key to access the data in the row object
   */
  dataKey?: keyof T;
  /**
   * If true, the column will be sticky on the left
   */
  sticky?: boolean;
}

export interface TableProps<T = any> {
  /**
   * Array of column definitions
   */
  columns: TableColumn<T>[];
  /**
   * Array of data rows
   */
  data: T[];
  /**
   * If true, shows loading skeleton
   */
  loading?: boolean;
  /**
   * Number of skeleton rows to show when loading
   */
  loadingRows?: number;
  /**
   * If true, enables row selection with checkboxes
   */
  selectable?: boolean;
  /**
   * Array of selected row indices
   */
  selected?: number[];
  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selected: number[]) => void;
  /**
   * Current sort configuration
   */
  sortBy?: string;
  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;
  /**
   * Callback when sort changes
   */
  onSortChange?: (column: string, direction: SortDirection) => void;
  /**
   * If true, shows alternating row colors
   */
  striped?: boolean;
  /**
   * If true, shows hover effects on rows
   */
  hoverable?: boolean;
  /**
   * If true, makes rows clickable
   */
  clickableRows?: boolean;
  /**
   * Callback when row is clicked
   */
  onRowClick?: (row: T, index: number) => void;
  /**
   * Custom empty state content
   */
  emptyState?: React.ReactNode;
  /**
   * Table variant
   */
  variant?: 'standard' | 'outlined' | 'elevated';
  /**
   * Table size
   */
  size?: 'small' | 'medium';
  /**
   * Maximum height of the table container
   */
  maxHeight?: number | string;
  /**
   * If true, makes the table container scrollable
   */
  stickyHeader?: boolean;
}

interface StyledTableContainerProps {
  variant: TableProps['variant'];
}

const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTableContainerProps>(({ theme, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      case 'elevated':
        return {
          boxShadow: theme.shadows[2],
        };
      default:
        return {
          boxShadow: theme.shadows[1],
        };
    }
  };

  return {
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    ...getVariantStyles(),
  };
});

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => !['striped', 'hoverable', 'clickable'].includes(prop as string),
})<{ striped?: boolean; hoverable?: boolean; clickable?: boolean }>(
  ({ theme, striped, hoverable, clickable }) => ({
    ...(striped && {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
    ...(hoverable && {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
    ...(clickable && {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    }),
  })
);

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'sticky',
})<{ sticky?: boolean }>(({ theme, sticky }) => ({
  ...(sticky && {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
}));

const TableSkeleton: React.FC<{ columns: TableColumn<any>[]; rows: number; showCheckbox?: boolean }> = ({ columns, rows, showCheckbox = false }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Skeleton variant="rectangular" width={20} height={20} />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            <Skeleton variant="text" width="100%" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const EmptyState: React.FC<{ content?: React.ReactNode }> = ({ content }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6,
      px: 2,
    }}
  >
    {content || (
      <>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No data available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          There are no records to display at the moment.
        </Typography>
      </>
    )}
  </Box>
);

export const Table = <T,>({
  columns,
  data,
  loading = false,
  loadingRows = 5,
  selectable = false,
  selected = [],
  onSelectionChange,
  sortBy,
  sortDirection,
  onSortChange,
  striped = false,
  hoverable = true,
  clickableRows = false,
  onRowClick,
  emptyState,
  variant = 'standard',
  size = 'medium',
  maxHeight,
  stickyHeader = false,
}: TableProps<T>) => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    
    if (event.target.checked) {
      onSelectionChange(data.map((_, index) => index));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (index: number) => {
    if (!onSelectionChange) return;
    
    const newSelected = selected.includes(index)
      ? selected.filter(i => i !== index)
      : [...selected, index];
    
    onSelectionChange(newSelected);
  };

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return;
    
    let newDirection: SortDirection = 'asc';
    
    if (sortBy === column.id) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = false;
      }
    }
    
    onSortChange(column.id, newDirection);
  };

  const handleRowClick = (row: T, index: number, event: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox or other interactive elements
    if ((event.target as HTMLElement).closest('input, button')) {
      return;
    }
    
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (column.render) {
      const index = data.indexOf(row);
      return column.render(column.dataKey ? (row as any)[column.dataKey] : row, row, index);
    }
    
    return column.dataKey ? (row as any)[column.dataKey] : '';
  };

  const isAllSelected = data.length > 0 && selected.length === data.length;
  const isIndeterminate = selected.length > 0 && selected.length < data.length;

  return (
    <Paper elevation={0} sx={{ borderRadius: 1 }}>
      <StyledTableContainer 
        variant={variant}
        sx={{ maxHeight }}
      >
        <MUITable stickyHeader={stickyHeader} size={size}>
          <TableHead>
            <TableRow>
              {selectable && (
                <StyledTableCell padding="checkbox" sticky>
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'select all rows' }}
                  />
                </StyledTableCell>
              )}
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                  }}
                  sticky={column.sticky}
                  sortDirection={sortBy === column.id ? sortDirection || false : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection || 'asc' : 'asc'}
                      onClick={() => handleSort(column)}
                    >
                      {column.label}
                      {sortBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton 
                columns={columns} 
                rows={loadingRows}
                showCheckbox={selectable}
              />
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} sx={{ p: 0 }}>
                  <EmptyState content={emptyState} />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const isSelected = selected.includes(index);
                
                return (
                  <StyledTableRow
                    key={index}
                    selected={isSelected}
                    striped={striped}
                    hoverable={hoverable}
                    clickable={clickableRows}
                    onClick={(event) => handleRowClick(row, index, event)}
                  >
                    {selectable && (
                      <StyledTableCell padding="checkbox" sticky>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(index)}
                          inputProps={{ 'aria-label': `select row ${index}` }}
                        />
                      </StyledTableCell>
                    )}
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sticky={column.sticky}
                      >
                        {getCellValue(row, column)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </MUITable>
      </StyledTableContainer>
    </Paper>
  );
};

Table.displayName = 'Table';