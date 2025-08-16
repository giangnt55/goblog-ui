import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from './hooks';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
} from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, error } = useLogin();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => navigate(from, { replace: true }),
      }
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign in
        </Typography>

        {error && <Alert severity="error">{(error as any)?.message || 'Login failed'}</Alert>}

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
