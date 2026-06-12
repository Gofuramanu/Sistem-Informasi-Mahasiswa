import { Link, useLocation } from "react-router-dom";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Container } from "@mui/material";

function PublicNavbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navButtonSx = (active) => ({
    position: "relative",
    color: active ? undefined : undefined,
    "&::after": active
      ? {
          content: '""',
          position: "absolute",
          bottom: 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "2px",
          backgroundColor: "#11cdef",
          borderRadius: "2px",
        }
      : {},
  });

  return (
    <ArgonBox
      sx={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        animation: "navSlideDown 0.6s ease both",
        "@keyframes navSlideDown": {
          from: { opacity: 0, transform: "translateY(-100%)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Container maxWidth="lg">
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" py={2}>
          <ArgonTypography variant="h4" fontWeight="bold" color="primary">
            Sistem Informasi Mahasiswa
          </ArgonTypography>
          <ArgonBox display="flex" gap={2}>
            <ArgonButton
              component={Link}
              to="/"
              variant="text"
              color={isActive("/") ? "info" : "dark"}
              sx={navButtonSx(isActive("/"))}
            >
              Home
            </ArgonButton>
            <ArgonButton
              component={Link}
              to="/mahasiswa"
              variant="text"
              color={isActive("/mahasiswa") ? "info" : "dark"}
              sx={navButtonSx(isActive("/mahasiswa"))}
            >
              Daftar Mahasiswa
            </ArgonButton>
            <ArgonButton component={Link} to="/admin/login" variant="gradient" color="info">
              Login Admin
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </Container>
    </ArgonBox>
  );
}

export default PublicNavbar;
