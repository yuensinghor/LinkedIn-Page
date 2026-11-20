import { motion } from 'motion/react';
import { SITE_CONFIG, SiteCopy, SiteLanguage } from '../data/portfolioContent';

interface NavbarProps {
  siteLang: SiteLanguage;
  onChangeLang: (lang: SiteLanguage) => void;
  copy: SiteCopy['nav'];
  onNavigateHome: (sectionId?: string) => void;
}

export function Navbar({
  siteLang,
  onChangeLang,
  copy,
  onNavigateHome,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E4E7] bg-[#FAFAFA]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Brand placeholder + small accent dot */}
        <button
          type="button"
          onClick={() => onNavigateHome()}
          className="group inline-flex shrink-0 items-center gap-2 text-left text-sm font-semibold tracking-tight text-[#111827] whitespace-nowrap transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          <span>{SITE_CONFIG.namePlaceholder}</span>
          <span
            className="h-2 w-2 rounded-full bg-[#2563EB] transition-transform duration-200 group-hover:scale-125"
            aria-hidden="true"
          />
        </button>

        {/* Center: Section links with subtle underline sweep */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-medium text-[#52525B] md:flex"
        >
          {[
            { id: 'projects', label: copy.projects },
            { id: 'how-i-build', label: copy.howIBuild },
            { id: 'journey', label: copy.journey },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateHome(item.id)}
              className="group relative shrink-0 py-1 whitespace-nowrap transition-colors duration-150 hover:text-[#111827] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 left-0 h-[1.5px] origin-left scale-x-0 bg-[#2563EB] transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </button>
          ))}
        </nav>

        {/* Right: Site-wide [EN | DE] language switcher with sliding active pill */}
        <div
          role="group"
          aria-label="Site language"
          className="inline-flex shrink-0 items-center rounded-lg border border-[#E4E4E7] bg-white p-0.5 font-mono text-xs"
        >
          {(['en', 'de'] as const).map((lang) => {
            const isActive = siteLang === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => onChangeLang(lang)}
                aria-pressed={isActive}
                className={`relative rounded-md px-2.5 py-1 uppercase whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  isActive
                    ? 'font-medium text-white'
                    : 'text-[#52525B] hover:text-[#111827]'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="site-lang-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-md bg-[#2563EB]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">{lang.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact mobile section jump bar */}
      <nav
        aria-label="Mobile section navigation"
        className="flex items-center justify-center gap-6 border-t border-[#E4E4E7]/70 px-4 py-2 text-xs font-medium text-[#52525B] md:hidden"
      >
        <button
          type="button"
          onClick={() => onNavigateHome('projects')}
          className="whitespace-nowrap transition-colors hover:text-[#111827]"
        >
          {copy.projects}
        </button>
        <button
          type="button"
          onClick={() => onNavigateHome('how-i-build')}
          className="whitespace-nowrap transition-colors hover:text-[#111827]"
        >
          {copy.howIBuild}
        </button>
        <button
          type="button"
          onClick={() => onNavigateHome('journey')}
          className="whitespace-nowrap transition-colors hover:text-[#111827]"
        >
          {copy.journey}
        </button>
      </nav>
    </header>
  );
}
