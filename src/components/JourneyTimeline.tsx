import { motion } from 'motion/react';
import { SiteCopy } from '../data/portfolioContent';

interface JourneyTimelineProps {
  copy: SiteCopy['journey'];
}

export function JourneyTimeline({ copy }: JourneyTimelineProps) {
  return (
    <section
      id="journey"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-[1100px] scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-2"
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

        {/* Vertical Connecting Dots Timeline */}
        <div className="relative pl-8 sm:pl-10">
          {/* Continuous 1px vertical guide line */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[11px] w-px bg-[#E4E4E7] sm:left-[15px]"
          />

          <ol className="space-y-6">
            {copy.items.map((item, idx) => {
              const isNow = item.state === 'now';
              const isNext = item.state === 'next';

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.28,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative"
                >
                  {/* Dot Motif: Past hollow (○), Now highlighted accent (●), Next dashed (◌) */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#FAFAFA] sm:-left-10"
                  >
                    {isNow ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2563EB]/15 transition-transform duration-200 group-hover:scale-125">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      </span>
                    ) : isNext ? (
                      <span className="h-3 w-3 rounded-full border-[1.5px] border-dashed border-[#52525B] bg-[#FAFAFA] transition-all duration-200 group-hover:scale-125 group-hover:rotate-45 group-hover:border-[#2563EB]" />
                    ) : (
                      <span className="h-3 w-3 rounded-full border-[1.5px] border-[#A1A1AA] bg-[#FAFAFA] transition-all duration-200 group-hover:scale-125 group-hover:border-[#111827]" />
                    )}
                  </span>

                  <div
                    className={`rounded-xl border p-5 transition-all duration-200 group-hover:-translate-y-0.5 ${
                      isNow
                        ? 'border-[#2563EB]/40 bg-white group-hover:border-[#2563EB]'
                        : 'border-[#E4E4E7] bg-white group-hover:border-[#D4D4D8]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isNow
                            ? 'font-medium text-[#2563EB]'
                            : 'text-[#52525B]'
                        }`}
                      >
                        {item.period}
                      </span>
                      <span className="font-mono text-[11px] text-[#52525B] transition-colors duration-150 group-hover:text-[#111827]">
                        {isNow ? '● ' : isNext ? '◌ ' : '○ '}
                        {item.stateLabel}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-semibold tracking-tight text-[#111827] sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#52525B] sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
