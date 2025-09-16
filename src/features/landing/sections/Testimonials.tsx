import { Box, Container, Grid, Typography } from "@mui/material";
import { TestimonialCard } from "@/components/ui";

const testimonials = [
  {
    content:
      "GoBlog has transformed how I write and share my thoughts. The interface is intuitive and the community is amazing!",
    author: "Sarah Johnson",
    role: "Tech Blogger",
    avatar: "S",
  },
  {
    content:
      "I've tried many blogging platforms, but GoBlog's performance and features are unmatched. Highly recommended!",
    author: "Mike Chen",
    role: "Content Creator",
    avatar: "M",
  },
  {
    content:
      "The analytics and engagement tools in GoBlog help me understand my audience better than ever before.",
    author: "Emily Davis",
    role: "Digital Marketer",
    avatar: "E",
  },
];

export default function Testimonials() {
  return (
    <Box
      id="testimonials"
      sx={{ py: 10, textAlign: "center", background: "rgba(25,118,210,0.02)" }}
    >
      <Container>
        <Typography variant="h4" fontWeight="bold" mb={6}>
          Loved by creators worldwide
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid key={i} size={{xs:12, md:4}}>
              <TestimonialCard {...t} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}