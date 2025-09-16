import { Paper, type PaperProps } from "@mui/material";

export function Card(props: PaperProps) {
  return (
    <Paper
      {...props}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 35px rgba(156,39,176,0.15)",
        },
        ...props.sx,
      }}
    />
  );
}
