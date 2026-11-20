import { motion } from 'motion/react';
import { SiteCopy } from '../data/portfolioContent';

interface HowIBuildProps {
  copy: SiteCopy['howIBuild'];
}

export function HowIBuild({ copy }: HowIBuildProps) {
  return (
    <section
      id="how-i-build"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-[1100px] scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col gap-2"
        >
          <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
            {copy.sectionIndex}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
            {copy.sectionTitle}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#52525B] sm:text-[15px]">
            {copy.sectionSub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left column: What AI tools handle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-colors duration-200 hover:border-[#D4D4D8]"
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#E4E4E7] pb-3.5">
              <h3 className="text-base font-semibold tracking-tight text-[#111827]">
                {copy.leftColumnTitle}
              </h3>
              <span className="font-mono text-xs text-[#52525B] tabular-nums">
                AI
              </span>
            </div>
            <ul className="space-y-1.5">
              {copy.leftBullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="group/item flex items-start gap-3 rounded-lg px-2.5 py-2 text-sm leading-relaxed text-[#52525B] transition-all duration-150 hover:translate-x-0.5 hover:bg-[#FAFAFA] hover:text-[#111827] sm:text-[15px]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-[#A1A1AA] transition-all duration-150 group-hover/item:scale-125 group-hover/item:border-[#111827]"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column: What I own & decide */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.3,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-colors duration-200 hover:border-[#D4D4D8]"
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#E4E4E7] pb-3.5">
              <h3 className="text-base font-semibold tracking-tight text-[#111827]">
                {copy.rightColumnTitle}
              </h3>
              <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                Human
              </span>
            </div>
            <ul className="space-y-1.5">
              {copy.rightBullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="group/item flex items-start gap-3 rounded-lg px-2.5 py-2 text-sm leading-relaxed text-[#111827] transition-all duration-150 hover:translate-x-0.5 hover:bg-[#FAFAFA] sm:text-[15px]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB] transition-transform duration-150 group-hover/item:scale-125"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
