import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, type LinkProps } from "@mui/material";

export function Link(props: LinkProps & { to?: string }) {
  const { sx, ...rest } = props;

  if (props.to) {
    return (
      <MuiLink
        component={RouterLink}
        underline="none"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          transition: "color 0.3s ease",
          "&:hover": { color: "primary.main" },
          ...sx,
        }}
        {...rest}
      />
    );
  }

  return (
    <MuiLink
      underline="none"
      color="text.secondary"
      sx={{
        fontWeight: 500,
        transition: "color 0.3s ease",
        "&:hover": { color: "primary.main" },
        ...sx,
      }}
      {...rest}
    />
  );
}