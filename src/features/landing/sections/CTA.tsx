import { Box, Container, Typography, Button } from "@mui/material";

export default function CTA() {
  return (
    <Container sx={{ py: 10 }}>
      <Box
        sx={{
          textAlign: "center",
          p: 6,
          borderRadius: 6,
          background: "linear-gradient(45deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))",
        }}
      >
        <Typography variant="h4" mb={2}>
          Ready to start your journey?
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Join thousands of creators who are already sharing their stories
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(45deg, #1976d2, #9c27b0)",
            color: "white",
            px: 4,
            py: 2,
          }}
        >
          Get Started Free
        </Button>
      </Box>
    </Container>
  );
}
