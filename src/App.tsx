import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import KumepumeAbout from "./pages/KumepumeAbout";
import Programs from "./pages/Programs";
import SectionPreview from "./pages/SectionPreview";

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
          <Route path="/activities/*" element={<SectionPreview section="activities" />} />
          <Route path="/transparency/*" element={<SectionPreview section="transparency" />} />
          <Route path="/join/*" element={<SectionPreview section="join" />} />
          <Route path="/contact" element={<SectionPreview section="contact" />} />
          <Route path="/about/*" element={<SectionPreview section="about" />} />
          <Route path="*" element={<SectionPreview section="not-found" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
