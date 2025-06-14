import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import { signInWithGoogle, signInWithFacebook } from '../../lib/supabase';
import { colors } from '../../theme/theme';

export const LoginPage: React.FC = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.obsidian} 0%, ${colors.carbon} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${colors.champagne}, transparent)`,
        },
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            background: colors.carbon,
            border: `1px solid ${colors.graphite}`,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Header */}
          <Paper
            sx={{
              background: `linear-gradient(135deg, ${colors.carbon} 0%, ${colors.graphite} 100%)`,
              p: 4,
              textAlign: 'center',
              borderBottom: `1px solid ${colors.graphite}`,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  border: `2px solid ${colors.champagne}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  background: `linear-gradient(135deg, ${colors.champagne}20, transparent)`,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: colors.champagne,
                    fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  B
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: colors.arctic,
                  fontWeight: 600,
                  mb: 1,
                  fontFamily: '"Inter", sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                BOWERY
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.champagne,
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                }}
              >
                Payment Portal
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: colors.racingSilver,
                lineHeight: 1.6,
              }}
            >
              Access your subscription management, payment history, and campaign credits
            </Typography>
          </Paper>

          {/* Login Form */}
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: colors.arctic,
                mb: 3,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Sign in to your account
            </Typography>

            <Stack spacing={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Google />}
                onClick={handleGoogleSignIn}
                sx={{
                  py: 1.5,
                  background: colors.champagne,
                  color: colors.obsidian,
                  fontWeight: 600,
                  '&:hover': {
                    background: '#e4c547',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 8px 25px ${colors.champagne}40`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Continue with Google
              </Button>

              <Box sx={{ position: 'relative' }}>
                <Divider
                  sx={{
                    '&::before, &::after': {
                      borderColor: colors.graphite,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.racingSilver,
                      px: 2,
                      background: colors.carbon,
                    }}
                  >
                    OR
                  </Typography>
                </Divider>
              </Box>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Facebook />}
                onClick={handleFacebookSignIn}
                sx={{
                  py: 1.5,
                  borderColor: colors.champagne,
                  color: colors.champagne,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: colors.champagne,
                    background: `${colors.champagne}10`,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Continue with Facebook
              </Button>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: colors.racingSilver,
                textAlign: 'center',
                mt: 4,
                lineHeight: 1.6,
              }}
            >
              By signing in, you agree to our{' '}
              <Box component="span" sx={{ color: colors.champagne, cursor: 'pointer' }}>
                Terms of Service
              </Box>{' '}
              and{' '}
              <Box component="span" sx={{ color: colors.champagne, cursor: 'pointer' }}>
                Privacy Policy
              </Box>
            </Typography>
          </CardContent>
        </Card>

        {/* Footer */}
        <Typography
          variant="body2"
          sx={{
            color: colors.racingSilver,
            textAlign: 'center',
            mt: 3,
          }}
        >
          © 2025 Bowery Creative. Engineering Intelligence.
        </Typography>
      </Container>
    </Box>
  );
};