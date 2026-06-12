import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import PublicNavbar from "./PublicNavbar";
import {
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Grid,
} from "@mui/material";

function PublicMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("");
  const [filterAngkatan, setFilterAngkatan] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, filterJurusan, filterAngkatan, mahasiswa]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mahasiswaRes, jurusanRes] = await Promise.all([
        mahasiswaAPI.getAll(),
        jurusanAPI.getAll(),
      ]);
      const mahasiswaData = Array.isArray(mahasiswaRes.data) ? mahasiswaRes.data : [];
      const jurusanData = Array.isArray(jurusanRes.data) ? jurusanRes.data : [];
      setMahasiswa(mahasiswaData);
      setFilteredData(mahasiswaData);
      setJurusan(jurusanData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = [...mahasiswa];
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.nim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterJurusan) {
      filtered = filtered.filter((m) => m.jurusan_id === filterJurusan);
    }
    if (filterAngkatan) {
      filtered = filtered.filter((m) => m.angkatan === parseInt(filterAngkatan));
    }
    setFilteredData(filtered);
  };

  const getAngkatanList = () => {
    const angkatanSet = new Set(mahasiswa.map((m) => m.angkatan));
    return Array.from(angkatanSet).sort((a, b) => b - a);
  };

  const getJurusanName = (jurusanId) => {
    const j = jurusan.find((j) => j.id === jurusanId);
    return j ? j.nama_jurusan : "-";
  };

  return (
    <ArgonBox
      minHeight="100vh"
      sx={{
        backgroundColor: "#f8f9fa",
        overflowX: "hidden",
        animation: "pageFadeIn 0.5s ease both",
        "@keyframes pageFadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Navbar */}
      <PublicNavbar />

      {/* Header Banner - animated gradient */}
      <ArgonBox
        pt={6}
        pb={6}
        sx={{
          background: "linear-gradient(-45deg, #11cdef, #2dce89, #667eea, #764ba2)",
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
          <ArgonTypography
            variant="h2"
            fontWeight="bold"
            sx={{
              color: "white !important",
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              animation: "heroFadeUp 0.8s ease 0.2s both",
              "@keyframes heroFadeUp": {
                from: { opacity: 0, transform: "translateY(30px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Daftar Mahasiswa
          </ArgonTypography>
          <ArgonTypography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9) !important",
              mt: 1,
              animation: "heroFadeUp 0.8s ease 0.4s both",
            }}
          >
            Lihat informasi lengkap data mahasiswa
          </ArgonTypography>
        </Container>
      </ArgonBox>

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card
          sx={{
            p: 3,
            animation: "cardSlideUp 0.7s ease 0.3s both",
            "@keyframes cardSlideUp": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Search & Filter */}
          <ArgonBox mb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <ArgonTypography variant="caption" fontWeight="bold" color="text" mb={0.5} display="block">
                  Cari Mahasiswa
                </ArgonTypography>
                <ArgonInput
                  placeholder="Cari nama atau NIM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ArgonTypography variant="caption" fontWeight="bold" color="text" mb={0.5} display="block">
                  Filter Jurusan
                </ArgonTypography>
                <FormControl fullWidth size="small">
                  <Select
                    value={filterJurusan}
                    displayEmpty
                    onChange={(e) => setFilterJurusan(e.target.value)}
                    sx={{ height: "42px" }}
                  >
                    <MenuItem value="">Semua Jurusan</MenuItem>
                    {jurusan.map((j) => (
                      <MenuItem key={j.id} value={j.id}>
                        {j.nama_jurusan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ArgonTypography variant="caption" fontWeight="bold" color="text" mb={0.5} display="block">
                  Filter Angkatan
                </ArgonTypography>
                <FormControl fullWidth size="small">
                  <Select
                    value={filterAngkatan}
                    displayEmpty
                    onChange={(e) => setFilterAngkatan(e.target.value)}
                    sx={{ height: "42px" }}
                  >
                    <MenuItem value="">Semua Angkatan</MenuItem>
                    {getAngkatanList().map((ang) => (
                      <MenuItem key={ang} value={ang}>
                        {ang}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </ArgonBox>

          {/* Table */}
          {loading ? (
            <ArgonBox display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </ArgonBox>
          ) : (
            <>
              <TableContainer sx={{ overflowX: "hidden", width: "100%" }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                    <TableRow>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NO</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NIM</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NAMA</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">JURUSAN</ArgonTypography></TableCell>
                      <TableCell align="center"><ArgonTypography variant="caption" fontWeight="bold">ANGKATAN</ArgonTypography></TableCell>
                      <TableCell align="center"><ArgonTypography variant="caption" fontWeight="bold">IPK</ArgonTypography></TableCell>
                      <TableCell align="center"><ArgonTypography variant="caption" fontWeight="bold">AKSI</ArgonTypography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .map((row, index) => (
                        <TableRow
                          key={row.id}
                          hover
                          sx={{
                            opacity: 0,
                            animation: "rowFadeIn 0.35s ease forwards",
                            animationDelay: `${index * 0.04}s`,
                            "@keyframes rowFadeIn": {
                              from: { opacity: 0 },
                              to: { opacity: 1 },
                            },
                            "&:hover": {
                              backgroundColor: "rgba(17,205,239,0.07) !important",
                              transition: "background-color 0.2s ease",
                            },
                          }}
                        >
                          <TableCell><ArgonTypography variant="caption">{index + 1}</ArgonTypography></TableCell>
                          <TableCell><ArgonTypography variant="caption" fontWeight="medium">{row.nim}</ArgonTypography></TableCell>
                          <TableCell><ArgonTypography variant="caption" fontWeight="medium">{row.nama}</ArgonTypography></TableCell>
                          <TableCell><ArgonTypography variant="caption">{getJurusanName(row.jurusan_id)}</ArgonTypography></TableCell>
                          <TableCell align="center">
                            <Chip label={row.angkatan} size="small" color="primary" />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.ipk}
                              size="small"
                              color={row.ipk >= 3.5 ? "success" : row.ipk >= 3.0 ? "info" : "warning"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <ArgonButton
                              component={Link}
                              to={`/mahasiswa/detail/${row.id}`}
                              variant="gradient"
                              color="info"
                              size="small"
                            >
                              Detail
                            </ArgonButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Card>
      </Container>
    </ArgonBox>
  );
}

export default PublicMahasiswa;
