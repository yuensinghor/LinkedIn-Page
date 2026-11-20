import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { INTRO_TABS, IntroLanguage, SiteCopy } from '../data/portfolioContent';

interface IntroCardProps {
  copy: SiteCopy['introCard'];
}

export function IntroCard({ copy }: IntroCardProps) {
  const [activeTab, setActiveTab] = useState<IntroLanguage>('en');
  const currentTab =
    INTRO_TABS.find((tab) => tab.id === activeTab) ?? INTRO_TABS[0];

  return (
    <motion.section
      aria-label={copy.title}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-12"
    >
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 transition-colors duration-200 hover:border-[#D4D4D8] sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[#111827]">
              {copy.title}
            </h2>
            <p className="mt-0.5 text-xs text-[#52525B]">{copy.hint}</p>
          </div>

          {/* 5-language pill tabs: [EN] [DE] [中文] [粵語] [BM] with sliding indicator */}
          <div
            role="tablist"
            aria-label="Personal introduction languages"
            className="flex flex-wrap items-center gap-1.5"
          >
            {INTRO_TABS.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative min-h-[34px] rounded-full border px-3 py-1 font-mono text-xs whitespace-nowrap transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                    isSelected
                      ? 'border-[#2563EB] font-medium text-white'
                      : 'border-[#E4E4E7] bg-[#FAFAFA] text-[#52525B] hover:border-[#D4D4D8] hover:text-[#111827]'
                  }`}
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="intro-lang-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 36,
                      }}
                      className="absolute inset-0 rounded-full bg-[#2563EB]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10">{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          aria-label={currentTab.languageName}
          className="pt-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[11px] text-[#52525B]">
                {currentTab.languageName}
              </p>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#111827]">
                {currentTab.placeholderText}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
