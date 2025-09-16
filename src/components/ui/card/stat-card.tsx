import { Typography } from "@mui/material";
import { Card } from "./card";

type StatCardProps = { value: string; label: string };

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card sx={{ textAlign: "center" }}>
      <Typography variant="h3" fontWeight="bold" color="primary">
        {value}
      </Typography>
      <Typography color="text.secondary">{label}</Typography>
    </Card>
  );
}
