import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { CircularProgress } from '@mui/material';
import ArgonBox from 'components/ArgonBox';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <ArgonBox 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </ArgonBox>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
