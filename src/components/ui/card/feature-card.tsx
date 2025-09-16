import { Box, Typography } from "@mui/material";
import { Card } from "./card";

type FeatureCardProps = { icon: string; title: string; desc: string };

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <Card>
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          fontSize: "1.5rem",
          background: "linear-gradient(45deg, #1976d2, #9c27b0)",
          color: "white",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight="bold">{title}</Typography>
      <Typography sx={{ mt: 1, color: "text.secondary" }}>{desc}</Typography>
    </Card>
  );
}
