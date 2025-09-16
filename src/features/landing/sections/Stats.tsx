import { Box, Container, Grid } from "@mui/material";
import { StatCard } from "@/components/ui";

const stats = [
  { value: "10K+", label: "Active Writers" },
  { value: "50K+", label: "Blog Posts" },
  { value: "1M+", label: "Monthly Readers" },
  { value: "99.9%", label: "Uptime" },
];

export default function Stats() {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Grid container spacing={4}>
          {stats.map((s, i) => (
            <Grid size={{xs:12, sm:6, md:3}} key={i}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
