import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { SubscriptionPlans } from './components/subscriptions/SubscriptionPlans';
import { CreditPackages } from './components/credits/CreditPackages';
import { theme } from './theme/theme';
import { stripePromise } from './lib/stripe';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscriptions':
        return <SubscriptionPlans />;
      case 'credits':
        return <CreditPackages />;
      case 'payments':
        return <div>Payment History - Coming Soon</div>;
      case 'settings':
        return <div>Settings - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <ProtectedRoute>
            <DashboardLayout
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            >
              {renderPage()}
            </DashboardLayout>
          </ProtectedRoute>
        </AuthProvider>
      </Elements>
    </ThemeProvider>
  );
}

export default App
