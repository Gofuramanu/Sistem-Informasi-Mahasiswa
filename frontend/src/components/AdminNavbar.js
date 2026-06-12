import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { AppBar, Toolbar, Container, Icon } from "@mui/material";
import PropTypes from "prop-types";

function AdminNavbar({ title, showDashboardLink = true, showMahasiswaLink = true }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ArgonTypography variant="h5" fontWeight="bold" color="dark">
            {title}
          </ArgonTypography>
          <ArgonBox display="flex" alignItems="center" gap={2}>
            {showDashboardLink && (
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/dashboard')}>
                Dashboard
              </ArgonButton>
            )}
            {showMahasiswaLink && (
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/mahasiswa')}>
                Data Mahasiswa
              </ArgonButton>
            )}
            <ArgonButton
              variant="outlined"
              color="dark"
              size="small"
              onClick={handleLogout}
            >
              <Icon sx={{ mr: 1 }}>logout</Icon>
              Logout
            </ArgonButton>
          </ArgonBox>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  showDashboardLink: PropTypes.bool,
  showMahasiswaLink: PropTypes.bool,
};

export default AdminNavbar;
