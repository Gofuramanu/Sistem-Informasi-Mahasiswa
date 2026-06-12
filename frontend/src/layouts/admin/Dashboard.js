import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Card, Grid, Container, AppBar, Toolbar, Icon } from "@mui/material";
import PropTypes from "prop-types";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    byJurusan: [],
    avgIPK: 0,
    latestMahasiswa: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [mahasiswaRes, jurusanRes] = await Promise.all([
        mahasiswaAPI.getAll(),
        jurusanAPI.getAll()
      ]);

      const mahasiswaData = mahasiswaRes.data;
      const jurusanData = jurusanRes.data;

      // Calculate stats
      const totalMahasiswa = mahasiswaData.length;
      
      // Group by jurusan
      const byJurusan = jurusanData.map(j => {
        const count = mahasiswaData.filter(m => m.jurusan_id === j.id).length;
        return { nama: j.nama_jurusan, count };
      });

      // Calculate average IPK
      const totalIPK = mahasiswaData.reduce((sum, m) => sum + parseFloat(m.ipk), 0);
      const avgIPK = (totalIPK / totalMahasiswa).toFixed(2);

      // Get latest 5 mahasiswa
      const latestMahasiswa = mahasiswaData.slice(-5).reverse();

      setStats({
        totalMahasiswa,
        byJurusan,
        avgIPK,
        latestMahasiswa
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ p: 3 }}>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center">
        <ArgonBox>
          <ArgonTypography variant="caption" color="text" fontWeight="bold">
            {title}
          </ArgonTypography>
          <ArgonTypography variant="h3" fontWeight="bold" mt={1}>
            {value}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3rem"
          height="3rem"
          borderRadius="md"
          sx={{
            background: `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
            color: "white"
          }}
        >
          <ArgonBox component="i" className={icon} fontSize="20px" />
        </ArgonBox>
      </ArgonBox>
    </Card>
  );

  StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  return (
    <ArgonBox minHeight="100vh" sx={{ backgroundColor: "#f8f9fa" }}>
      {/* Navbar */}
      <AppBar position="sticky" color="inherit" sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ArgonTypography variant="h5" fontWeight="bold" color="dark">
              Admin Dashboard
            </ArgonTypography>
            <ArgonBox display="flex" alignItems="center" gap={2}>
              <ArgonButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => navigate('/admin/dashboard')}
              >
                <Icon sx={{ mr: 1, fontSize: "14px !important" }}>home</Icon>
                Home
              </ArgonButton>
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/mahasiswa')}>Daftar Mahasiswa</ArgonButton>
              <ArgonButton
                variant="outlined"
                color="dark"
                size="small"
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
              >
                <Icon sx={{ mr: 1 }}>logout</Icon>
                Logout
              </ArgonButton>
            </ArgonBox>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Welcome Section */}
          <ArgonBox mb={3}>
            <ArgonTypography variant="h3" fontWeight="bold">
              Dashboard Admin
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Selamat datang, {user?.nama_lengkap || user?.username}!
            </ArgonTypography>
          </ArgonBox>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Total Mahasiswa"
                value={stats.totalMahasiswa}
                icon="ni ni-single-02"
                color="#5e72e4"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Rata-rata IPK"
                value={stats.avgIPK}
                icon="ni ni-chart-bar-32"
                color="#2dce89"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Jumlah Jurusan"
                value={stats.byJurusan.length}
                icon="ni ni-books"
                color="#fb6340"
              />
            </Grid>
          </Grid>

          {/* Mahasiswa by Jurusan */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={2}>
                  Mahasiswa per Jurusan
                </ArgonTypography>
                <ArgonBox>
                  {stats.byJurusan.map((item, index) => (
                    <ArgonBox 
                      key={index}
                      display="flex" 
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                      pb={2}
                      sx={{ borderBottom: index < stats.byJurusan.length - 1 ? "1px solid #e9ecef" : "none" }}
                    >
                      <ArgonTypography variant="body2">{item.nama}</ArgonTypography>
                      <ArgonTypography variant="h6" fontWeight="bold" color="info">
                        {item.count}
                      </ArgonTypography>
                    </ArgonBox>
                  ))}
                </ArgonBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={2}>
                  Mahasiswa Terbaru
                </ArgonTypography>
                <ArgonBox>
                  {stats.latestMahasiswa.map((mhs, index) => (
                    <ArgonBox 
                      key={index}
                      mb={2}
                      pb={2}
                      sx={{ borderBottom: index < stats.latestMahasiswa.length - 1 ? "1px solid #e9ecef" : "none" }}
                    >
                      <ArgonTypography variant="caption" fontWeight="bold">
                        {mhs.nama}
                      </ArgonTypography>
                      <ArgonTypography variant="caption" display="block" color="text">
                        {mhs.nim} - IPK: {mhs.ipk}
                      </ArgonTypography>
                    </ArgonBox>
                  ))}
                </ArgonBox>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Card sx={{ p: 3 }}>
            <ArgonTypography variant="h6" fontWeight="bold" mb={2}>
              Quick Actions
            </ArgonTypography>
            <ArgonBox display="flex" gap={2} flexWrap="wrap">
              <ArgonButton
                variant="gradient"
                color="info"
                onClick={() => navigate('/admin/mahasiswa')}
              >
                <ArgonBox component="i" className="ni ni-bullet-list-67" mr={1} />
                Kelola Mahasiswa
              </ArgonButton>
              <ArgonButton
                variant="gradient"
                color="success"
                onClick={() => navigate('/admin/mahasiswa/tambah')}
              >
                <ArgonBox component="i" className="ni ni-fat-add" mr={1} />
                Tambah Mahasiswa
              </ArgonButton>
            </ArgonBox>
          </Card>
      </Container>
    </ArgonBox>
  );
}

export default Dashboard;
