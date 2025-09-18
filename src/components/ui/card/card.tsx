import React from 'react';
import { Card as MUICard, type CardProps as MUICardProps, CardContent, CardHeader, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';

export interface CardProps extends Omit<MUICardProps, 'variant' | 'title'> {
  /**
   * The variant to use
   */
  variant?: 'elevated' | 'outlined' | 'filled' | 'gradient';
  /**
   * If true, the card will have hover effects
   */
  hoverable?: boolean;
  /**
   * If true, the card will be clickable with appropriate cursor and focus states
   */
  clickable?: boolean;
  /**
   * Card header title
   */
  title?: React.ReactNode;
  /**
   * Card header subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Avatar to display in header
   */
  avatar?: React.ReactNode;
  /**
   * Action icon in header (defaults to menu icon if not provided)
   */
  headerAction?: React.ReactNode;
  /**
   * If true, shows default menu action in header
   */
  showHeaderAction?: boolean;
  /**
   * Content of the card
   */
  children?: React.ReactNode;
  /**
   * Footer actions
   */
  actions?: React.ReactNode;
  /**
   * Custom padding for card content
   */
  contentPadding?: number | string;
}

interface StyledCardProps {
  customVariant: CardProps['variant'];
  hoverable?: boolean;
  clickable?: boolean;
}

const StyledCard = styled(MUICard, {
  shouldForwardProp: (prop) => !['customVariant', 'hoverable', 'clickable'].includes(prop as string),
})<StyledCardProps>(({ theme, customVariant, hoverable = false, clickable = false }) => {
  const getVariantStyles = () => {
    switch (customVariant) {
      case 'elevated':
        return {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
        };
      case 'outlined':
        return {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.grey[800] 
            : theme.palette.grey[50],
          boxShadow: 'none',
        };
      case 'gradient':
        return {
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        };
      default:
        return {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
        };
    }
  };

  const getHoverStyles = () => {
    if (!hoverable && !clickable) return {};
    
    return {
      transition: theme.transitions.create([
        'box-shadow',
        'transform',
        'background-color',
      ], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        boxShadow: customVariant === 'outlined' || customVariant === 'filled'
          ? theme.shadows[4]
          : theme.shadows[8],
        transform: 'translateY(-2px)',
      },
    };
  };

  const getClickableStyles = () => {
    if (!clickable) return {};
    
    return {
      cursor: 'pointer',
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
      },
      '&:active': {
        transform: 'translateY(0px)',
        boxShadow: customVariant === 'elevated' || customVariant === 'gradient'
          ? theme.shadows[2]
          : theme.shadows[1],
      },
    };
  };

  return {
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    ...getVariantStyles(),
    ...getHoverStyles(),
    ...getClickableStyles(),
  };
});

const StyledCardContent = styled(CardContent)<{ contentPadding?: number | string }>(
  ({ theme, contentPadding }) => ({
    padding: contentPadding || theme.spacing(2),
    '&:last-child': {
      paddingBottom: contentPadding || theme.spacing(2),
    },
  })
);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      hoverable = false,
      clickable = false,
      title,
      subtitle,
      avatar,
      headerAction,
      showHeaderAction = false,
      children,
      actions,
      contentPadding,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || subtitle || avatar || headerAction || showHeaderAction;
    const hasActions = Boolean(actions);

    const defaultHeaderAction = showHeaderAction && !headerAction ? (
      <IconButton size="small">
        <MoreVert />
      </IconButton>
    ) : headerAction;

    return (
      <StyledCard
        ref={ref}
        customVariant={variant}
        hoverable={hoverable}
        clickable={clickable}
        {...props}
      >
        {hasHeader && (
          <CardHeader
            avatar={avatar}
            action={defaultHeaderAction}
            title={title}
            subtitle={subtitle}
            sx={{
              paddingBottom: children ? 1 : 2,
            }}
          />
        )}
        
        {children && (
          <StyledCardContent contentPadding={contentPadding}>
            {children}
          </StyledCardContent>
        )}
        
        {hasActions && (
          <CardActions sx={{ padding: 2, paddingTop: 0 }}>
            {actions}
          </CardActions>
        )}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';

// Additional composed card components for common use cases
export const SimpleCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'title' | 'subtitle' | 'avatar' | 'headerAction' | 'showHeaderAction' | 'actions'>>(
  ({ children, ...props }, ref) => (
    <Card ref={ref} {...props}>
      {children}
    </Card>
  )
);

SimpleCard.displayName = 'SimpleCard';

export const HeaderCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, title, subtitle, ...props }, ref) => (
    <Card
      ref={ref}
      title={title}
      subtitle={subtitle}
      {...props}
    >
      {children}
    </Card>
  )
);

HeaderCard.displayName = 'HeaderCard';

export const ActionCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, actions, ...props }, ref) => (
    <Card
      ref={ref}
      actions={actions}
      {...props}
    >
      {children}
    </Card>
  )
);

ActionCard.displayName = 'ActionCard';