import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Button, Link } from "@/components/ui";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #1976d2, #9c27b0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GoBlog
        </Typography>

       <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
        <Link href="#features">Features</Link>
        <Link href="#testimonials">Community</Link>
        <Link href="#pricing">Pricing</Link>
        <Button customVariant="outline" href="/login">Sign In</Button>
        <Button customVariant="primary">Get Started</Button>
      </Box>
      </Toolbar>
    </AppBar>
  );
}
