import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { colors } from '../../theme/theme';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.obsidian} 0%, ${colors.carbon} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: colors.champagne,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }} 
        />
        <Typography
          variant="h6"
          sx={{
            color: colors.racingSilver,
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          Loading Bowery Portal...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};