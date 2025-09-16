import { Box, Container, Stack, Typography } from "@mui/material";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <Box sx={{ py: 12, textAlign: "center" }}>
      <Container>
        <Typography variant="h2" fontWeight="bold" mb={3}
          sx={{
            background: "linear-gradient(45deg, #333, rgba(51,51,51,0.7))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Write. Share. Inspire.
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}
          sx={{ maxWidth: 600, mx: "auto" }}>
          The modern blogging platform that empowers creators to build meaningful connections through powerful storytelling tools and vibrant community features.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button customVariant="primary" size="large">Start Writing Today →</Button>
          <Button customVariant="outline" size="large">Watch Demo</Button>
        </Stack>
      </Container>
    </Box>
  );
}
