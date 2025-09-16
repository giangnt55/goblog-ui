import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.1)", py: 4 }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography color="text.secondary">
          © 2025 GoBlog. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton href="#" sx={{ bgcolor: "#f5f5f5" }}>
            <GitHubIcon />
          </IconButton>
          <IconButton href="#" sx={{ bgcolor: "#f5f5f5" }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" sx={{ bgcolor: "#f5f5f5" }}>
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
