import { forwardRef } from "react";
import { Button as MuiButton, type ButtonProps } from "@mui/material";

type CustomButtonProps = Omit<ButtonProps, "variant"> & {
  customVariant?: "primary" | "outline";
};

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ customVariant = "primary", sx, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        {...props}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
          ...(customVariant === "primary" && {
            background: "linear-gradient(45deg, #1976d2, #9c27b0)",
            color: "white",
            "&:hover": { boxShadow: "0 8px 25px rgba(25,118,210,0.4)" },
          }),
          ...(customVariant === "outline" && {
            border: "2px solid #1976d2",
            color: "#1976d2",
            background: "transparent",
            "&:hover": { background: "#1976d2", color: "white" },
          }),
          ...sx,
        }}
      />
    );
  }
);

Button.displayName = "Button";
