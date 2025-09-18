import React from 'react';
import { Card, SimpleCard, HeaderCard, ActionCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, Typography, Chip, IconButton, Box } from '@mui/material';
import { Favorite, Share, MoreVert, Person, Email, Phone } from '@mui/icons-material';

export const CardExamples: React.FC = () => {
  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Typography variant="h4" gutterBottom>Card Variants</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        <Card variant="elevated">
          <Typography variant="h6" gutterBottom>Elevated Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This is an elevated card with shadow for emphasis.
          </Typography>
        </Card>
        
        <Card variant="outlined">
          <Typography variant="h6" gutterBottom>Outlined Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This is an outlined card with border and no shadow.
          </Typography>
        </Card>
        
        <Card variant="filled">
          <Typography variant="h6" gutterBottom>Filled Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This is a filled card with background color.
          </Typography>
        </Card>
        
        <Card variant="gradient">
          <Typography variant="h6" gutterBottom>Gradient Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This is a gradient card with glassmorphism effect.
          </Typography>
        </Card>
      </Box>

      <Typography variant="h4" gutterBottom>Interactive Cards</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        <Card hoverable>
          <Typography variant="h6" gutterBottom>Hoverable Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This card has hover effects but is not clickable.
          </Typography>
        </Card>
        
        <Card clickable onClick={() => alert('Card clicked!')}>
          <Typography variant="h6" gutterBottom>Clickable Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This card is clickable and has focus states.
          </Typography>
        </Card>
      </Box>

      <Typography variant="h4" gutterBottom>Cards with Headers</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
        <Card
          title="User Profile"
          subtitle="Active user since 2023"
          avatar={<Avatar><Person /></Avatar>}
          showHeaderAction
        >
          <Typography variant="body2" color="text.secondary">
            This card includes a header with title, subtitle, avatar, and action menu.
          </Typography>
        </Card>
        
        <Card
          title="Project Dashboard"
          subtitle="Last updated 2 hours ago"
          headerAction={
            <IconButton size="small">
              <Share />
            </IconButton>
          }
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip label="Active" color="success" size="small" />
            <Chip label="High Priority" color="warning" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Custom header action with status chips.
          </Typography>
        </Card>
      </Box>

      <Typography variant="h4" gutterBottom>Cards with Actions</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
        <Card
          title="Blog Post"
          subtitle="Published 3 days ago"
          avatar={<Avatar>B</Avatar>}
          actions={
            <>
              <IconButton size="small">
                <Favorite />
              </IconButton>
              <IconButton size="small">
                <Share />
              </IconButton>
              <Button variant="primary" size="small">
                Read More
              </Button>
            </>
          }
        >
          <Typography variant="body2" color="text.secondary">
            This is a preview of an amazing blog post about React components.
            Click the actions below to interact with this post.
          </Typography>
        </Card>
        
        <Card
          variant="outlined"
          actions={
            <>
              <Button variant="ghost" size="small">
                Cancel
              </Button>
              <Button variant="primary" size="small">
                Save Changes
              </Button>
            </>
          }
        >
          <Typography variant="h6" gutterBottom>Settings</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Update your preferences and configuration settings here.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Changes will be applied immediately after saving.
          </Typography>
        </Card>
      </Box>

      <Typography variant="h4" gutterBottom>Complex Card Example</Typography>
      <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
        <Card
          variant="elevated"
          hoverable
          title="John Doe"
          subtitle="Software Engineer"
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>}
          headerAction={
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          }
          actions={
            <>
              <IconButton size="small">
                <Email />
              </IconButton>
              <IconButton size="small">
                <Phone />
              </IconButton>
              <Button variant="primary" size="small">
                Contact
              </Button>
            </>
          }
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Senior developer with 8+ years of experience in React, TypeScript, and Node.js.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="React" size="small" />
              <Chip label="TypeScript" size="small" />
              <Chip label="Node.js" size="small" />
              <Chip label="MUI" size="small" />
            </Box>
          </Box>
        </Card>
      </Box>

      <Typography variant="h4" gutterBottom>Composed Card Components</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        <SimpleCard variant="filled">
          <Typography variant="h6" gutterBottom>Simple Card</Typography>
          <Typography variant="body2" color="text.secondary">
            Just content, no header or actions.
          </Typography>
        </SimpleCard>
        
        <HeaderCard
          title="Header Card"
          subtitle="With built-in header"
          variant="outlined"
        >
          <Typography variant="body2" color="text.secondary">
            Simplified component for cards that always have headers.
          </Typography>
        </HeaderCard>
        
        <ActionCard
          variant="gradient"
          actions={
            <Button variant="primary" size="small">
              Take Action
            </Button>
          }
        >
          <Typography variant="h6" gutterBottom>Action Card</Typography>
          <Typography variant="body2" color="text.secondary">
            Simplified component for cards that always have actions.
          </Typography>
        </ActionCard>
      </Box>

    </Box>
  );
};