import ThemeRTL from "./util/ThemeRTL";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import News from "./pages/News/News";
import Ads from "./pages/Ads/Ads";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Sports from "./pages/Sports/Sports";
import { ProtectedRoute } from "./context/auth";
import History from "./pages/History/History";
import PublicPlaces from "./pages/PublicPlaces/PublicPlaces";

const AppLayout = () => (
  <Layout>
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  </Layout>
);
function App() {
  return (
    <ThemeRTL>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<News />} />
          <Route path="/news" element={<News />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/PublicPlaces" element={<PublicPlaces />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeRTL>
  );
}

export default App;
