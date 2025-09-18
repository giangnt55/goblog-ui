import React from 'react';
import { Button } from '@/components/ui/button';
import { Add, Download, Delete } from '@mui/icons-material';

export const ButtonExamples: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Button Variants</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <h2>Button Sizes</h2>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>

      <h2>Buttons with Icons</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button startIcon={<Add />}>Add Item</Button>
        <Button variant="outline" endIcon={<Download />}>
          Download
        </Button>
        <Button variant="danger" startIcon={<Delete />}>
          Delete
        </Button>
      </div>

      <h2>Loading States</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button loading={loading} onClick={handleAsyncAction}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="outline" loading>
          Processing
        </Button>
      </div>

      <h2>Disabled State</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button disabled>Disabled Primary</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </div>

      <h2>Floating vs Flat</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button>Flat Button (default)</Button>
        <Button floating>Floating Button</Button>
        <Button variant="outline">Flat Outline</Button>
        <Button variant="outline" floating>Floating Outline</Button>
      </div>

      <h2>Full Width</h2>
      <div style={{ maxWidth: '300px' }}>
        <Button fullWidth>Full Width Button</Button>
      </div>

      <h2>Event Handlers</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => alert('Clicked!')}>
          Click Me
        </Button>
        <Button
          variant="secondary"
          onMouseEnter={() => console.log('Mouse entered')}
          onMouseLeave={() => console.log('Mouse left')}
        >
          Hover Me
        </Button>
      </div>
    </div>
  );
};