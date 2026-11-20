import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { CaseStudyView } from './components/CaseStudyView';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HowIBuild } from './components/HowIBuild';
import { IntroCard } from './components/IntroCard';
import { JourneyTimeline } from './components/JourneyTimeline';
import { LegalModal } from './components/LegalModal';
import { Navbar } from './components/Navbar';
import { SelectedBuilds } from './components/SelectedBuilds';
import {
  PORTFOLIO_COPY,
  ProjectId,
  SiteLanguage,
} from './data/portfolioContent';

function parseHashRoute(): ProjectId | null {
  const hash = window.location.hash;
  if (hash === '#/projects/home-inventory') {
    return 'home-inventory';
  }
  if (hash === '#/projects/cantonese-voice') {
    return 'cantonese-voice';
  }
  return null;
}

export default function App() {
  const [siteLang, setSiteLang] = useState<SiteLanguage>('en');
  const [activeProject, setActiveProject] = useState<ProjectId | null>(() =>
    parseHashRoute()
  );
  const [legalOpen, setLegalOpen] = useState(false);

  const copy = PORTFOLIO_COPY[siteLang];

  useEffect(() => {
    document.documentElement.lang = siteLang;
  }, [siteLang]);

  useEffect(() => {
    const onHashChange = () => {
      setActiveProject(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateHome = (sectionId?: string) => {
    if (activeProject !== null) {
      setActiveProject(null);
      window.history.pushState(null, '', '#/');
      window.requestAnimationFrame(() => {
        if (sectionId) {
          scrollToSection(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      return;
    }

    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: ProjectId) => {
    setActiveProject(projectId);
    window.history.pushState(null, '', `#/projects/${projectId}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#111827]">
        <Navbar
          siteLang={siteLang}
          onChangeLang={setSiteLang}
          copy={copy.nav}
          onNavigateHome={handleNavigateHome}
        />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={`case-${activeProject}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaseStudyView
                  project={copy.projects[activeProject]}
                  uiCopy={copy.caseStudyUi}
                  onBackHome={() => handleNavigateHome()}
                />
              </motion.div>
            ) : (
              <motion.main
                key="home-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <HeroSection
                  copy={copy.hero}
                  onSeeBuilds={() => scrollToSection('projects')}
                />
                <IntroCard copy={copy.introCard} />
                <SelectedBuilds
                  copy={copy.builds}
                  projects={copy.projects}
                  onSelectProject={handleSelectProject}
                />
                <HowIBuild copy={copy.howIBuild} />
                <JourneyTimeline copy={copy.journey} />
              </motion.main>
            )}
          </AnimatePresence>
        </div>

        <Footer copy={copy.footer} onOpenLegal={() => setLegalOpen(true)} />

        <LegalModal
          isOpen={legalOpen}
          onClose={() => setLegalOpen(false)}
          copy={copy.footer}
        />
      </div>
    </MotionConfig>
  );
}
