import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import StyleBlock from './components/StyleBlock';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import KineticMarquee from './components/KineticMarquee';
import HomeStats from './components/HomeStats';
import ProblemSolution from './components/ProblemSolution';
import SubjectsGrid from './components/SubjectsGrid';
import LearnPage from './components/LearnPage';
import StudyLab from './components/StudyLab';
import ResourcesPage from './components/ResourcesPage';
import PYQPage from './components/PYQPage';
import RoadmapPage from './components/RoadmapPage';
import QuickTestPage from './components/QuickTestPage';
import CommunityPage from './components/CommunityPage';
import JoinPage from './components/JoinPage';
import Footer from './components/Footer';
import marquee from './data/marquee.json';

interface ResourceContext {
  category: string | null;
  subject: string | null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <KineticMarquee text={marquee.left} direction="left" />
      <HomeStats />
      <ProblemSolution />
      <KineticMarquee text={marquee.right} direction="right" />
      <SubjectsGrid />
    </>
  );
}

function AppLayout() {
  const [resourceContext, setResourceContext] = useState<ResourceContext>({ category: null, subject: null });

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] selection:bg-[#DFE104] selection:text-black relative">
      <StyleBlock />
      <div className="noise-bg opacity-[0.03] fixed inset-0 pointer-events-none z-50"></div>
      <Navbar />
      <main className="transition-all duration-300 min-h-[85vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage setResourceContext={setResourceContext} />} />
          <Route path="/pyqs" element={<PYQPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/resources" element={<ResourcesPage resourceContext={resourceContext} setResourceContext={setResourceContext} />} />
          <Route path="/lab" element={<StudyLab />} />
          <Route path="/quicktest" element={<QuickTestPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
