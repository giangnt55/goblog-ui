import { Box, Container, Grid, Typography, Paper } from "@mui/material";

const features = [
  { title: "Viết Blog dễ dàng", desc: "Giao diện thân thiện, viết và đăng nhanh chóng." },
  { title: "Quản lý Kỷ niệm", desc: "Lưu giữ nhật ký cá nhân theo từng giai đoạn." },
  { title: "Chia sẻ & Kết nối", desc: "Kết nối với bạn bè và cộng đồng." },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Tại sao chọn chúng tôi?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {f.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}