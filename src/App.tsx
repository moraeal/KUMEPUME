import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Home from "./pages/Home";
import KumepumeAbout from "./pages/KumepumeAbout";
import Join from "./pages/Join";
import Programs from "./pages/Programs";
import SectionPreview from "./pages/SectionPreview";
import Transparency from "./pages/Transparency";

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
          <Route path="/transparency/*" element={<Transparency />} />
          <Route path="/join/*" element={<Join />} />
          <Route path="/contact" element={<Join />} />
          <Route path="/about/*" element={<SectionPreview section="about" />} />
          <Route path="*" element={<SectionPreview section="not-found" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
