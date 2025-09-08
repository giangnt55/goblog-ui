import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h2" fontWeight="bold">
          Chào mừng đến với Blog Kỷ Niệm
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Nơi bạn lưu giữ ký ức và chia sẻ câu chuyện của riêng mình
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4 }}
          href="/login"
        >
          Bắt đầu ngay
        </Button>
      </Container>
    </Box>
  );
}
