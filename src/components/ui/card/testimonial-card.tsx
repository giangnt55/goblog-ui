import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Card } from "@/components/ui/card";

type Props = {
  content: string;
  author: string;
  role: string;
  avatar: string;
};

export function TestimonialCard({ content, author, role, avatar }: Props) {
  return (
    <Card>
      <Typography
        variant="body1"
        fontStyle="italic"
        color="text.secondary"
        mb={3}
      >
        "{content}"
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main" }}>{avatar}</Avatar>
        <Box textAlign="left">
          <Typography fontWeight="bold">{author}</Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
