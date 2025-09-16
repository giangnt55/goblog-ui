import { Box, Container, Grid, Typography } from "@mui/material";
import { FeatureCard } from "@/components/ui";

const features = [
  {
    icon: "✍️",
    title: "Rich Editor",
    desc: "Create beautiful blog posts with our intuitive markdown editor and live preview functionality.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Built with modern technologies for optimal performance and seamless user experience.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    desc: "Your content is protected with enterprise-grade security and privacy controls.",
  },
  {
    icon: "👥",
    title: "Community Driven",
    desc: "Connect with fellow writers and engage with your audience through comments and shares.",
  },
];

export default function Features() {
  return (
    <Box id="features" sx={{ py: 10, textAlign: "center" }}>
      <Container>
        <Typography variant="h4" fontWeight="bold">
          Everything you need to succeed
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 6 }}>
          Powerful features designed to help you create, grow, and engage
        </Typography>

        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid size={{xs:12, md:4}} key={i}>
              <FeatureCard {...f} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
