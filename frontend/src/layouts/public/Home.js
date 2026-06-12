import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Card, Container, Grid } from "@mui/material";
import PublicNavbar from "./PublicNavbar";

function FeatureCard({ icon, colorHex, title, description, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          p: 3,
          height: "100%",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: hovered
            ? "translateY(-10px)"
            : visible
            ? "translateY(0)"
            : "translateY(40px)",
          transition: hovered
            ? "transform 0.3s ease, box-shadow 0.3s ease"
            : `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
          boxShadow: hovered
            ? "0 20px 50px rgba(0,0,0,0.18)"
            : "0 4px 16px rgba(0,0,0,0.06)",
          cursor: "default",
        }}
      >
        <ArgonBox
          sx={{
            fontSize: "48px",
            color: colorHex,
            display: "block",
            mb: 2,
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.2)" : "scale(1)",
          }}
          component="i"
          className={`ni ${icon}`}
        />
        <ArgonTypography variant="h5" fontWeight="bold" mb={2}>
          {title}
        </ArgonTypography>
        <ArgonTypography variant="body2" color="text">
          {description}
        </ArgonTypography>
      </Card>
    </div>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  colorHex: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

function Home() {
  return (
    <ArgonBox
      minHeight="100vh"
      sx={{
        backgroundColor: "#f8f9fa",
        // Animate page on load
        animation: "pageFadeIn 0.5s ease both",
        "@keyframes pageFadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Navbar */}
      <PublicNavbar />

      {/* Hero Section - animated gradient background */}
      <ArgonBox
        pt={10}
        pb={9}
        sx={{
          background: "linear-gradient(-45deg, #667eea, #764ba2, #11cdef, #2dce89)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
          "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <ArgonTypography
                variant="h1"
                fontWeight="bold"
                mb={2}
                sx={{
                  color: "white !important",
                  textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  animation: "heroFadeUp 0.8s ease 0.2s both",
                  "@keyframes heroFadeUp": {
                    from: { opacity: 0, transform: "translateY(40px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Selamat Datang di Sistem Informasi Mahasiswa
              </ArgonTypography>
              <ArgonTypography
                variant="h5"
                mb={5}
                sx={{
                  color: "rgba(255,255,255,0.9) !important",
                  animation: "heroFadeUp 0.8s ease 0.4s both",
                }}
              >
                Akses informasi data mahasiswa dengan mudah dan cepat
              </ArgonTypography>
              <ArgonBox
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  animation: "heroFadeUp 0.8s ease 0.6s both",
                }}
              >
                <ArgonButton
                  component={Link}
                  to="/mahasiswa"
                  size="large"
                  sx={{
                    backgroundColor: "white !important",
                    color: "#667eea !important",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
                    },
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  Lihat Data Mahasiswa
                </ArgonButton>
                <ArgonButton
                  component={Link}
                  to="/admin/login"
                  size="large"
                  sx={{
                    backgroundColor: "transparent !important",
                    border: "2px solid white",
                    color: "white !important",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2) !important",
                      transform: "scale(1.05)",
                    },
                    transition: "transform 0.25s ease, background-color 0.25s ease",
                  }}
                >
                  Login Admin
                </ArgonButton>
              </ArgonBox>
            </Grid>
          </Grid>
        </Container>
      </ArgonBox>

      {/* Features Section */}
      <ArgonBox pb={8} pt={8}>
        <Container maxWidth="lg">
          <ArgonTypography variant="h3" fontWeight="bold" textAlign="center" mb={5}>
            Fitur Sistem
          </ArgonTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon="ni-single-02"
                colorHex="#11cdef"
                title="Data Mahasiswa Lengkap"
                description="Akses informasi lengkap mahasiswa termasuk NIM, jurusan, angkatan, dan IPK"
                delay={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon="ni-zoom-split-in"
                colorHex="#2dce89"
                title="Pencarian & Filter"
                description="Cari mahasiswa berdasarkan nama, NIM, atau filter berdasarkan jurusan"
                delay={0.15}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon="ni-lock-circle-open"
                colorHex="#fb6340"
                title="Admin Dashboard"
                description="Admin dapat mengelola data mahasiswa dengan fitur CRUD lengkap"
                delay={0.3}
              />
            </Grid>
          </Grid>
        </Container>
      </ArgonBox>

      {/* Footer */}
      <ArgonBox
        sx={{
          backgroundColor: "#344767",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <ArgonTypography variant="body2" textAlign="center" color="white">
            © 2026 Sistem Informasi Mahasiswa. All rights reserved.
          </ArgonTypography>
        </Container>
      </ArgonBox>
    </ArgonBox>
  );
}

export default Home;
