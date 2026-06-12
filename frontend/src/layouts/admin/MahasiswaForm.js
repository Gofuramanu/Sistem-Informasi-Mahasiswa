import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { mahasiswaAPI, jurusanAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import { 
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Container,
  AppBar,
  Toolbar,
  Icon
} from "@mui/material";

function MahasiswaForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;

  const [jurusan, setJurusan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    jurusan_id: "",
    angkatan: "",
    jenis_kelamin: "",
    ipk: "",
    alamat: "",
    email: "",
    no_hp: ""
  });

  useEffect(() => {
    fetchJurusan();
    if (isEdit) {
      fetchMahasiswa();
    }
  }, [id]);

  const fetchJurusan = async () => {
    try {
      const response = await jurusanAPI.getAll();
      setJurusan(response.data);
    } catch (error) {
      console.error('Error fetching jurusan:', error);
    }
  };

  const fetchMahasiswa = async () => {
    try {
      const response = await mahasiswaAPI.getById(id);
      if (response.data && response.data.length > 0) {
        setFormData(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching mahasiswa:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nama || !formData.nim || !formData.jurusan_id || !formData.angkatan || 
        !formData.jenis_kelamin || !formData.ipk) {
      setError("Semua field wajib diisi");
      return false;
    }

    if (parseFloat(formData.ipk) < 0 || parseFloat(formData.ipk) > 4) {
      setError("IPK harus antara 0 dan 4");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await mahasiswaAPI.update(id, formData);
        alert('Data berhasil diupdate');
      } else {
        await mahasiswaAPI.create(formData);
        alert('Data berhasil ditambahkan');
      }
      navigate('/admin/mahasiswa');
    } catch (error) {
      console.error('Error saving data:', error);
      setError(error.response?.data || 'Terjadi kesalahan saat menyimpan data');
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
              {isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
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
            {isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
          </ArgonTypography>
        </ArgonBox>

        <Card sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <ArgonBox component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Data Pribadi */}
              <Grid item xs={12}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={2} color="info">
                  Data Pribadi
                </ArgonTypography>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    Nama Lengkap <span style={{ color: 'red' }}>*</span>
                  </ArgonTypography>
                  <ArgonInput
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    size="large"
                    fullWidth
                    required
                  />
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    NIM <span style={{ color: 'red' }}>*</span>
                  </ArgonTypography>
                  <ArgonInput
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    placeholder="Masukkan NIM"
                    size="large"
                    fullWidth
                    required
                  />
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Jenis Kelamin</InputLabel>
                  <Select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    label="Jenis Kelamin"
                  >
                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    Email
                  </ArgonTypography>
                  <ArgonInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email"
                    size="large"
                    fullWidth
                  />
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    No. HP
                  </ArgonTypography>
                  <ArgonInput
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleChange}
                    placeholder="Masukkan nomor HP"
                    size="large"
                    fullWidth
                  />
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    Alamat
                  </ArgonTypography>
                  <ArgonInput
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Masukkan alamat"
                    size="large"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </ArgonBox>
              </Grid>

              {/* Data Akademik */}
              <Grid item xs={12}>
                <ArgonTypography variant="h6" fontWeight="bold" mb={2} mt={2} color="info">
                  Data Akademik
                </ArgonTypography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Jurusan</InputLabel>
                  <Select
                    name="jurusan_id"
                    value={formData.jurusan_id}
                    onChange={handleChange}
                    label="Jurusan"
                  >
                    {jurusan.map((j) => (
                      <MenuItem key={j.id} value={j.id}>
                        {j.nama_jurusan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    Angkatan <span style={{ color: 'red' }}>*</span>
                  </ArgonTypography>
                  <ArgonInput
                    type="number"
                    name="angkatan"
                    value={formData.angkatan}
                    onChange={handleChange}
                    placeholder="Masukkan angkatan (misal: 2024)"
                    size="large"
                    fullWidth
                    required
                  />
                </ArgonBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonTypography variant="caption" fontWeight="bold" mb={1}>
                    IPK <span style={{ color: 'red' }}>*</span>
                  </ArgonTypography>
                  <ArgonInput
                    type="number"
                    step="0.01"
                    name="ipk"
                    value={formData.ipk}
                    onChange={handleChange}
                    placeholder="Masukkan IPK (0.00 - 4.00)"
                    size="large"
                    fullWidth
                    required
                  />
                </ArgonBox>
              </Grid>

              {/* Submit Buttons */}
              <Grid item xs={12}>
                <ArgonBox display="flex" gap={2} mt={3}>
                  <ArgonButton
                    type="submit"
                    variant="gradient"
                    color="success"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
                  </ArgonButton>
                  <ArgonButton
                    variant="outlined"
                    color="dark"
                    size="large"
                    onClick={() => navigate('/admin/mahasiswa')}
                  >
                    Batal
                  </ArgonButton>
                </ArgonBox>
              </Grid>
            </Grid>
          </ArgonBox>
        </Card>
      </Container>
    </ArgonBox>
  );
}

export default MahasiswaForm;
