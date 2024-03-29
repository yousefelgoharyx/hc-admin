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
import Sport from "./pages/Sports/Sport";
import GameModerators from "./pages/GameModerators/GameModerators";
import TeamModerators from "./pages/TeamModerators/TeamModerators";
import Vip from "./pages/Vip/Vip";

import Team from "./pages/Team/Team";
import Players from "./pages/Players/Players";
import Managerial from "./pages/Managerial/Managerial";
import Organize from "./pages/Organize/Organize";
import Matches from "./pages/Matches/Matches";
import Center from "./pages/Center/Center";
import CenterModerators from "./pages/CenterModerators/CenterModerators";
import CenterServices from "./pages/CenterServices/CenterServices";

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
          <Route path="/sports/:id" element={<Sport />} />
          <Route path="/game-moderators" element={<GameModerators />} />
          <Route path="/team-moderators" element={<TeamModerators />} />
          <Route path="/team" element={<Team />} />
          <Route path="/players" element={<Players />} />
          <Route path="/vip" element={<Vip />} />
          <Route path="/managerial" element={<Managerial />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/center" element={<Center />} />
          <Route path="/center-moderators" element={<CenterModerators />} />
          <Route path="/center-services" element={<CenterServices />} />

          <Route path="/PublicPlaces" element={<PublicPlaces />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeRTL>
  );
}

export default App;
