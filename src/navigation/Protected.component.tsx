import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { routes } from './routes';

interface ProtectedProps {
  children: React.ReactNode;
}
const Protected = ({ children }: ProtectedProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const navigateToExplore = React.useCallback(() => {
    navigate(routes.explore()._);
  }, [navigate]);

  React.useEffect(() => {
    if (auth.isUserAnonymous()) navigateToExplore();
  }, [auth, navigateToExplore]);

  if (auth.isUserAnonymous()) {
    return null;
  }

  return <>{children}</>;
};

export default Protected;
