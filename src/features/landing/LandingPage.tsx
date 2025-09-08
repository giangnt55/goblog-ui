import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
}
