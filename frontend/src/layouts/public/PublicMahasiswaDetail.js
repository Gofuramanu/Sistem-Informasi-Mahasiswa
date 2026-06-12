import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Container, Card, Grid, CircularProgress, Divider, Chip } from "@mui/material";
import PropTypes from "prop-types";
import PublicNavbar from "./PublicNavbar";

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

function PublicMahasiswaDetail() {
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
        
        // Fetch jurusan detail
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
      {/* Navbar */}
      <PublicNavbar />

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ArgonBox mb={3}>
          <ArgonButton
            component={Link}
            to="/mahasiswa"
            variant="text"
            color="dark"
            sx={{ mb: 2 }}
          >
            <ArgonBox component="i" className="ni ni-bold-left" mr={1} />
            Kembali ke Daftar
          </ArgonButton>
          <ArgonTypography variant="h3" fontWeight="bold" mb={1}>
            Detail Mahasiswa
          </ArgonTypography>
          <ArgonTypography variant="body2" color="text">
            Informasi lengkap data mahasiswa
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
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <ArgonTypography variant="h5" fontWeight="bold" mb={3} color="info">
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

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <ArgonTypography variant="h5" fontWeight="bold" mb={3} color="info">
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

                <ArgonTypography variant="h5" fontWeight="bold" mb={3} color="info">
                  Kontak
                </ArgonTypography>
                
                <InfoItem label="Email" value={mahasiswa.email} />
                <InfoItem label="No. HP" value={mahasiswa.no_hp} />
                <InfoItem label="Alamat" value={mahasiswa.alamat} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <ArgonBox display="flex" justifyContent="center">
              <ArgonButton
                component={Link}
                to="/mahasiswa"
                variant="gradient"
                color="info"
                size="large"
              >
                Kembali ke Daftar Mahasiswa
              </ArgonButton>
            </ArgonBox>
          </Card>
        ) : (
          <Card sx={{ p: 5, textAlign: "center" }}>
            <ArgonTypography variant="h5" color="error">
              Data tidak ditemukan
            </ArgonTypography>
            <ArgonButton
              component={Link}
              to="/mahasiswa"
              variant="gradient"
              color="info"
              sx={{ mt: 3 }}
            >
              Kembali ke Daftar
            </ArgonButton>
          </Card>
        )}
      </Container>
    </ArgonBox>
  );
}

export default PublicMahasiswaDetail;
