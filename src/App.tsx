import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LegacyRouteFallback from "./components/LegacyRouteFallback";
import ScrollToTop from "./components/ScrollToTop";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Home from "./pages/Home";
import AboutSubpage from "./pages/AboutSubpage";
import KumepumeAbout from "./pages/KumepumeAbout";
import Join from "./pages/Join";
import Programs from "./pages/Programs";
import Transparency from "./pages/Transparency";
import LegacyArchive from "./pages/LegacyArchive";
import LegacyStoryDetail from "./pages/LegacyStoryDetail";
import LegacyVideos from "./pages/LegacyVideos";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-charcoal">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<KumepumeAbout />} />
          <Route path="/programs/*" element={<Programs />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/stories" element={<Activities />} />
          <Route path="/activities/events" element={<Activities />} />
          <Route path="/activities/archive" element={<Activities />} />
          <Route path="/activities/:activityId" element={<ActivityDetail />} />
          <Route path="/stories/archive" element={<LegacyArchive />} />
          <Route path="/stories/archive/:storyId" element={<LegacyStoryDetail />} />
          <Route path="/stories/videos" element={<LegacyVideos />} />
          <Route path="/transparency/*" element={<Transparency />} />
          <Route path="/join/*" element={<Join />} />
          <Route path="/contact" element={<Join />} />
          <Route path="/about/*" element={<AboutSubpage />} />
          <Route path="*" element={<LegacyRouteFallback />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
