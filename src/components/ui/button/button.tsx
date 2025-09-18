import React from 'react';
import { Button as MUIButton, type ButtonProps as MUIButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'size'> {
  /**
   * The variant to use
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If true, the button will show a loading spinner
   */
  loading?: boolean;
  /**
   * Icon to display on the left side of the button
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the button
   */
  endIcon?: React.ReactNode;
  /**
   * If true, the button will take full width of its container
   */
  fullWidth?: boolean;
  /**
   * If true, the button will have a floating/elevated appearance with shadow
   */
  floating?: boolean;
}

interface StyledButtonProps {
  customVariant: ButtonProps['variant'];
  customSize: ButtonProps['size'];
  floating?: boolean;
}

const StyledButton = styled(MUIButton, {
  shouldForwardProp: (prop) => !['customVariant', 'customSize', 'floating'].includes(prop as string),
})<StyledButtonProps>(({ theme, customVariant, customSize, floating = false }) => {
  const getVariantStyles = () => {
    switch (customVariant) {
      case 'primary':
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          },
        };
      case 'secondary':
        return {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
          '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          },
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '&:disabled': {
            borderColor: theme.palette.action.disabled,
            color: theme.palette.action.disabled,
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&:disabled': {
            color: theme.palette.action.disabled,
          },
        };
      case 'danger':
        return {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.error.dark,
          },
          '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (customSize) {
      case 'small':
        return {
          padding: theme.spacing(0.5, 1.5),
          fontSize: theme.typography.body2.fontSize,
          minHeight: 32,
        };
      case 'large':
        return {
          padding: theme.spacing(1.5, 3),
          fontSize: theme.typography.body1.fontSize,
          minHeight: 48,
        };
      case 'medium':
      default:
        return {
          padding: theme.spacing(1, 2),
          fontSize: theme.typography.body1.fontSize,
          minHeight: 40,
        };
    }
  };

  return {
    ...getVariantStyles(),
    ...getSizeStyles(),
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: theme.spacing(1),
    boxShadow: floating ? theme.shadows[2] : 'none',
    transition: theme.transitions.create([
      'background-color',
      'box-shadow',
      'border-color',
      'color',
    ]),
    '&:hover': {
      ...getVariantStyles()['&:hover'],
      boxShadow: floating ? theme.shadows[4] : 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  };
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      loading = false,
      startIcon,
      endIcon,
      disabled,
      floating = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <StyledButton
        ref={ref}
        variant="contained"
        size="medium" // Always use medium for MUI, we handle sizing in styled component
        disabled={isDisabled}
        startIcon={
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            startIcon
          )
        }
        endIcon={!loading ? endIcon : undefined}
        customVariant={variant}
        customSize={size}
        floating={floating}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';