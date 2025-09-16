import { Box } from "@mui/material";
import {
  Navbar,
  Hero,
  Stats,
  Features,
  Testimonials,
  CTA,
  Footer,
} from "@/features/landing/sections";

export default function LandingDemoPage() {
  return (
    <Box>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </Box>
  );
}
