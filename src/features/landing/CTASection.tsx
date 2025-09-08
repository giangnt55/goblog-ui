import { Box, Container, Typography, Button } from "@mui/material";

export default function CTASection() {
  return (
    <Box sx={{ bgcolor: "secondary.main", color: "white", py: 8, textAlign: "center" }}>
      <Container>
        <Typography variant="h4" fontWeight="bold">
          Sẵn sàng bắt đầu hành trình của bạn?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          href="/login"
        >
          Tham gia ngay
        </Button>
      </Container>
    </Box>
  );
}
