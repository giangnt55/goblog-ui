import { CircularProgress, Box } from "@mui/material";

export function Spinner({ size = 40 }: { size?: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}