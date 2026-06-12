import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { authAPI } from "services/api";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Card, Alert, Icon, InputAdornment, IconButton } from "@mui/material";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(username, password);
      
      if (response.data.message === 'Login berhasil') {
        login(response.data);
        navigate('/admin/dashboard');
      } else {
        setError(response.data || 'Login gagal');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArgonBox
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f8f9fa" }}
    >
      <ArgonBox sx={{ width: "100%", maxWidth: "400px", px: 2 }}>
        {/* Logo / Icon area */}
        <ArgonBox textAlign="center" mb={3}>
          <ArgonBox
            sx={{
              width: 72,
              height: 72,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(102,126,234,0.4)",
              mb: 2,
            }}
          >
            <Icon sx={{ fontSize: "32px !important", color: "#fff" }}>school</Icon>
          </ArgonBox>
          <ArgonTypography variant="h4" fontWeight="bold" color="dark" sx={{ letterSpacing: "-0.5px" }}>
            Portal Akademik
          </ArgonTypography>
          <ArgonTypography variant="body2" color="text" sx={{ mt: 0.5 }}>
            Admin Dashboard
          </ArgonTypography>
        </ArgonBox>

        {/* Card */}
        <Card
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "#fff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <ArgonBox mb={3}>
            <ArgonTypography variant="h5" fontWeight="bold" color="dark">
              Selamat datang kembali
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" mt={0.5}>
              Masuk untuk mengelola data akademik
            </ArgonTypography>
          </ArgonBox>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                borderRadius: "10px",
                fontSize: "0.8rem",
              }}
            >
              {error}
            </Alert>
          )}

          <ArgonBox component="form" onSubmit={handleLogin}>
            {/* Username */}
            <ArgonBox mb={2}>
              <ArgonTypography variant="caption" fontWeight="bold" color="dark" sx={{ mb: 0.75, display: "block" }}>
                Username
              </ArgonTypography>
              <ArgonInput
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="large"
                fullWidth
                icon={{ component: "person", direction: "left" }}
              />
            </ArgonBox>

            {/* Password */}
            <ArgonBox mb={3}>
              <ArgonTypography variant="caption" fontWeight="bold" color="dark" sx={{ mb: 0.75, display: "block" }}>
                Password
              </ArgonTypography>
              <ArgonInput
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                fullWidth
                icon={{ component: "lock", direction: "left" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ mr: 0.5 }}
                    >
                      <Icon sx={{ fontSize: "18px !important", color: "text.secondary" }}>
                        {showPassword ? "visibility_off" : "visibility"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </ArgonBox>

            <ArgonButton
              type="submit"
              variant="gradient"
              color="info"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.4,
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                boxShadow: "0 4px 20px rgba(102,126,234,0.4)",
              }}
            >
              {loading ? (
                <ArgonBox display="flex" alignItems="center" gap={1}>
                  <Icon sx={{ fontSize: "16px !important", animation: "spin 1s linear infinite", "@keyframes spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } } }}>refresh</Icon>
                  Memproses...
                </ArgonBox>
              ) : (
                <ArgonBox display="flex" alignItems="center" gap={1}>
                  Masuk
                </ArgonBox>
              )}
            </ArgonButton>
          </ArgonBox>

          <ArgonBox mt={3} textAlign="center">
            <ArgonButton
              variant="text"
              color="info"
              size="small"
              onClick={() => navigate("/")}
              sx={{ fontSize: "0.78rem" }}
            >
              <Icon sx={{ fontSize: "14px !important", mr: 0.5 }}></Icon>
              Kembali ke Halaman Utama
            </ArgonButton>
          </ArgonBox>
        </Card>

        {/* Footer text */}
        <ArgonBox textAlign="center" mt={3}>
          <ArgonTypography variant="caption" color="text">
            &copy; {new Date().getFullYear()} Portal Akademik. All rights reserved.
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </ArgonBox>
  );
}

export default AdminLogin;
