import ThemeRTL from "./util/ThemeRTL";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import News from "./pages/News/News";
import Ads from "./pages/Ads/Ads";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import { ProtectedRoute } from "./context/auth";
import History from "./pages/History/History";
function App() {
  return (
    <ThemeRTL>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/ads"
          element={
            <Layout>
              <ProtectedRoute>
                <Ads />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/history"
          element={
            <Layout>
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeRTL>
  );
}

export default App;
