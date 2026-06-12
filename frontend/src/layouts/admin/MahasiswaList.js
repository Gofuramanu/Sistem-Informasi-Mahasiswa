import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import { 
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Container,
  AppBar,
  Toolbar,
  Icon
} from "@mui/material";

function MahasiswaList() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, nama: "" });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, mahasiswa]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mahasiswaRes, jurusanRes] = await Promise.all([
        mahasiswaAPI.getAll(),
        jurusanAPI.getAll()
      ]);
      setMahasiswa(mahasiswaRes.data);
      setFilteredData(mahasiswaRes.data);
      setJurusan(jurusanRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = mahasiswa.filter(m =>
        m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.nim.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(mahasiswa);
    }
  };

  const handleDelete = async () => {
    try {
      await mahasiswaAPI.delete(deleteDialog.id);
      alert('Data berhasil dihapus');
      setDeleteDialog({ open: false, id: null, nama: "" });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data');
    }
  };

  const getJurusanName = (jurusanId) => {
    const j = jurusan.find(j => j.id === jurusanId);
    return j ? j.nama_jurusan : '-';
  };

  return (
    <ArgonBox minHeight="100vh" sx={{ backgroundColor: "#f8f9fa" }}>
      {/* Navbar */}
      <AppBar position="sticky" color="inherit" sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ArgonTypography variant="h5" fontWeight="bold" color="dark">
              Data Mahasiswa
            </ArgonTypography>
            <ArgonBox display="flex" alignItems="center" gap={2}>
              <ArgonButton variant="text" color="dark" onClick={() => navigate('/admin/dashboard')}>
                <Icon sx={{ mr: 1, fontSize: "14px !important" }}>home</Icon>
                Home
              </ArgonButton>
              <ArgonButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => navigate('/admin/mahasiswa')}
              >
                Daftar Mahasiswa
              </ArgonButton>
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
        <ArgonBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <ArgonBox>
            <ArgonTypography variant="h3" fontWeight="bold">
              Data Mahasiswa
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Kelola data mahasiswa
            </ArgonTypography>
          </ArgonBox>
          <ArgonButton
            variant="gradient"
            color="success"
            onClick={() => navigate('/admin/mahasiswa/tambah')}
          >
            <ArgonBox component="i" className="ni ni-fat-add" mr={1} />
            Tambah Mahasiswa
          </ArgonButton>
        </ArgonBox>

        <Card sx={{ p: 3, overflowX: "hidden" }}>
          {/* Search */}
          <ArgonBox mb={3} maxWidth="400px">
            <ArgonInput
              placeholder="Cari nama atau NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
            />
          </ArgonBox>

          {loading ? (
            <ArgonBox display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </ArgonBox>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                    <TableRow>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NO</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NIM</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">NAMA</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">JURUSAN</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">ANGKATAN</ArgonTypography></TableCell>
                      <TableCell><ArgonTypography variant="caption" fontWeight="bold">IPK</ArgonTypography></TableCell>
                      <TableCell align="center"><ArgonTypography variant="caption" fontWeight="bold">AKSI</ArgonTypography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .map((row, index) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <ArgonTypography variant="caption" fontWeight="medium">
                              {row.nim}
                            </ArgonTypography>
                          </TableCell>
                          <TableCell>
                            <ArgonTypography variant="caption" fontWeight="medium">
                              {row.nama}
                            </ArgonTypography>
                          </TableCell>
                          <TableCell>
                            <ArgonTypography variant="caption">
                              {getJurusanName(row.jurusan_id)}
                            </ArgonTypography>
                          </TableCell>
                          <TableCell>
                            <Chip label={row.angkatan} size="small" color="primary" />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={row.ipk} 
                              size="small" 
                              color={row.ipk >= 3.5 ? "success" : row.ipk >= 3.0 ? "info" : "warning"} 
                            />
                          </TableCell>
                          <TableCell align="center">
                            <ArgonBox display="flex" gap={1} justifyContent="center">
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => navigate(`/admin/mahasiswa/detail/${row.id}`)}
                                title="Detail"
                              >
                                <ArgonBox component="i" className="ni ni-badge" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="warning"
                                onClick={() => navigate(`/admin/mahasiswa/edit/${row.id}`)}
                                title="Edit"
                              >
                                <ArgonBox component="i" className="ni ni-ruler-pencil" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteDialog({ open: true, id: row.id, nama: row.nama })}
                                title="Hapus"
                              >
                                <ArgonBox component="i" className="ni ni-fat-remove" />
                              </IconButton>
                            </ArgonBox>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </>
          )}
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null, nama: "" })}>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            <ArgonTypography variant="body2">
              Apakah Anda yakin ingin menghapus data mahasiswa <strong>{deleteDialog.nama}</strong>?
            </ArgonTypography>
          </DialogContent>
          <DialogActions>
            <ArgonButton
              variant="text"
              color="dark"
              onClick={() => setDeleteDialog({ open: false, id: null, nama: "" })}
            >
              Batal
            </ArgonButton>
            <ArgonButton variant="gradient" color="error" onClick={handleDelete}>
              Hapus
            </ArgonButton>
          </DialogActions>
        </Dialog>
      </Container>
    </ArgonBox>
  );
}

export default MahasiswaList;
