import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Card, Grid, CircularProgress, Divider, Chip, Container, AppBar, Toolbar, Icon } from "@mui/material";
import PropTypes from "prop-types";

const InfoItem = ({ label, value }) => (
  <ArgonBox mb={2}>
    <ArgonTypography variant="caption" color="text" fontWeight="bold">
      {label}
    </ArgonTypography>
    <ArgonTypography variant="body2" color="dark">
      {value || '-'}
    </ArgonTypography>
  </ArgonBox>
);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function MahasiswaDetail() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [jurusan, setJurusan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await mahasiswaAPI.getById(id);
      if (response.data && response.data.length > 0) {
        const mhs = response.data[0];
        setMahasiswa(mhs);
        
        const jurusanRes = await jurusanAPI.getById(mhs.jurusan_id);
        if (jurusanRes.data && jurusanRes.data.length > 0) {
          setJurusan(jurusanRes.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArgonBox minHeight="100vh" sx={{ backgroundColor: "#f8f9fa" }}>
      <AppBar position="sticky" color="inherit" sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ArgonTypography variant="h5" fontWeight="bold" color="dark">
              Detail Mahasiswa
            </ArgonTypography>
            <ArgonBox display="flex" alignItems="center" gap={2}>
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/dashboard')}>Dashboard</ArgonButton>
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/mahasiswa')}>Data Mahasiswa</ArgonButton>
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ArgonBox mb={3}>
          <ArgonButton
            variant="text"
            color="dark"
            onClick={() => navigate('/admin/mahasiswa')}
            sx={{ mb: 2 }}
          >
            <ArgonBox component="i" className="ni ni-bold-left" mr={1} />
            Kembali
          </ArgonButton>
          <ArgonTypography variant="h3" fontWeight="bold">
            Detail Mahasiswa
          </ArgonTypography>
        </ArgonBox>

        {loading ? (
          <Card sx={{ p: 5 }}>
            <ArgonBox display="flex" justifyContent="center">
              <CircularProgress />
            </ArgonBox>
          </Card>
        ) : mahasiswa ? (
          <Card sx={{ p: 4 }}>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <ArgonTypography variant="h5" fontWeight="bold">
                {mahasiswa.nama}
              </ArgonTypography>
              <ArgonButton
                variant="gradient"
                color="warning"
                onClick={() => navigate(`/admin/mahasiswa/edit/${id}`)}
              >
                <ArgonBox component="i" className="ni ni-ruler-pencil" mr={1} />
                Edit Data
              </ArgonButton>
            </ArgonBox>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={3} color="info">
                  Data Pribadi
                </ArgonTypography>
                
                <InfoItem label="Nama Lengkap" value={mahasiswa.nama} />
                <InfoItem label="NIM" value={mahasiswa.nim} />
                <InfoItem label="Jenis Kelamin" value={mahasiswa.jenis_kelamin} />
                <InfoItem label="Angkatan" value={mahasiswa.angkatan} />
                
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" color="text" fontWeight="bold">
                    IPK
                  </ArgonTypography>
                  <ArgonBox mt={1}>
                    <Chip 
                      label={mahasiswa.ipk} 
                      color={mahasiswa.ipk >= 3.5 ? "success" : mahasiswa.ipk >= 3.0 ? "info" : "warning"}
                      sx={{ fontWeight: "bold" }}
                    />
                  </ArgonBox>
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={3} color="info">
                  Data Akademik
                </ArgonTypography>
                
                <InfoItem 
                  label="Jurusan" 
                  value={jurusan ? jurusan.nama_jurusan : '-'} 
                />
                <InfoItem 
                  label="Fakultas" 
                  value={jurusan ? jurusan.fakultas : '-'} 
                />

                <Divider sx={{ my: 3 }} />

                <ArgonTypography variant="h6" fontWeight="bold" mb={3} color="info">
                  Kontak
                </ArgonTypography>
                
                <InfoItem label="Email" value={mahasiswa.email} />
                <InfoItem label="No. HP" value={mahasiswa.no_hp} />
                <InfoItem label="Alamat" value={mahasiswa.alamat} />
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card sx={{ p: 5, textAlign: "center" }}>
            <ArgonTypography variant="h5" color="error">
              Data tidak ditemukan
            </ArgonTypography>
          </Card>
        )}
      </Container>
    </ArgonBox>
  );
}

export default MahasiswaDetail;
