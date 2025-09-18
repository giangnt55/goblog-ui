import React from 'react';
import {
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Skeleton,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export interface TableSkeletonProps {
  /**
   * Number of columns to show
   */
  columns?: number;
  /**
   * Number of rows to show
   */
  rows?: number;
  /**
   * If true, shows a header row
   */
  showHeader?: boolean;
  /**
   * If true, shows checkboxes in the first column
   */
  showCheckbox?: boolean;
  /**
   * Table variant
   */
  variant?: 'standard' | 'outlined' | 'elevated';
  /**
   * Table size
   */
  size?: 'small' | 'medium';
  /**
   * Custom column widths
   */
  columnWidths?: (string | number)[];
}

interface StyledTableContainerProps {
  variant: TableSkeletonProps['variant'];
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

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns = 4,
  rows = 5,
  showHeader = true,
  showCheckbox = false,
  variant = 'standard',
  size = 'medium',
  columnWidths = [],
}) => {
  const totalColumns = columns + (showCheckbox ? 1 : 0);
  
  const getColumnWidth = (index: number) => {
    if (showCheckbox && index === 0) {
      return 58; // Checkbox column width
    }
    
    const adjustedIndex = showCheckbox ? index - 1 : index;
    return columnWidths[adjustedIndex] || '100%';
  };

  const getSkeletonWidth = (index: number) => {
    if (showCheckbox && index === 0) {
      return 24; // Checkbox width
    }
    
    const adjustedIndex = showCheckbox ? index - 1 : index;
    const width = columnWidths[adjustedIndex];
    
    if (typeof width === 'number') {
      return `${Math.max(60, width * 0.7)}px`;
    }
    
    // Vary skeleton widths for more realistic appearance
    const widthVariations = ['100%', '80%', '90%', '70%', '85%'];
    return widthVariations[adjustedIndex % widthVariations.length];
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 1 }}>
      <StyledTableContainer variant={variant}>
        <MUITable size={size}>
          {showHeader && (
            <TableHead>
              <TableRow>
                {Array.from({ length: totalColumns }).map((_, index) => (
                  <TableCell
                    key={index}
                    style={{ width: getColumnWidth(index) }}
                    padding={showCheckbox && index === 0 ? 'checkbox' : 'normal'}
                  >
                    <Skeleton
                      variant="text"
                      width={getSkeletonWidth(index)}
                      height={20}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: totalColumns }).map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    padding={showCheckbox && colIndex === 0 ? 'checkbox' : 'normal'}
                  >
                    {showCheckbox && colIndex === 0 ? (
                      <Skeleton variant="rectangular" width={20} height={20} />
                    ) : (
                      <Skeleton
                        variant="text"
                        width={getSkeletonWidth(colIndex)}
                        height={16}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </StyledTableContainer>
    </Paper>
  );
};

// Specific skeleton variants for common use cases
export const DataTableSkeleton: React.FC<Omit<TableSkeletonProps, 'showCheckbox' | 'showHeader'>> = (props) => (
  <TableSkeleton {...props} showHeader showCheckbox />
);

export const SimpleTableSkeleton: React.FC<Omit<TableSkeletonProps, 'showCheckbox'>> = (props) => (
  <TableSkeleton {...props} showCheckbox={false} />
);

export const CompactTableSkeleton: React.FC<TableSkeletonProps> = (props) => (
  <TableSkeleton {...props} size="small" rows={3} />
);

TableSkeleton.displayName = 'TableSkeleton';
DataTableSkeleton.displayName = 'DataTableSkeleton';
SimpleTableSkeleton.displayName = 'SimpleTableSkeleton';
CompactTableSkeleton.displayName = 'CompactTableSkeleton';