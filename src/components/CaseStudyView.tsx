import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { ProjectCaseStudy, SiteCopy } from '../data/portfolioContent';
import { WireframeSlot } from './WireframeSlot';

interface CaseStudyViewProps {
  project: ProjectCaseStudy;
  uiCopy: SiteCopy['caseStudyUi'];
  onBackHome: () => void;
}

export function CaseStudyView({
  project,
  uiCopy,
  onBackHome,
}: CaseStudyViewProps) {
  const [activeFlowIdx, setActiveFlowIdx] = useState<number | null>(null);

  const scrollToUnderTheHood = () => {
    const el = document.getElementById('under-the-hood');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const backLabel = uiCopy.backToHome.replace(/^←\s*/, '');
  const jumpLabel = uiCopy.jumpToTechnical.replace(/\s*↓$/, '');

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 sm:py-14">
      {/* Top back navigation */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackHome}
          className="group inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2 text-sm font-medium text-[#111827] whitespace-nowrap transition-all duration-150 hover:border-[#D4D4D8] hover:bg-[#F4F4F5]/60 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
        >
          <ArrowLeft
            className="h-4 w-4 text-[#52525B] transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:text-[#111827]"
            aria-hidden="true"
          />
          <span>{backLabel}</span>
        </button>

        <span className="font-mono text-xs text-[#52525B] tabular-nums">
          {project.layer1.storyEyebrow}
        </span>
      </div>

      {/* ================================================================= */}
      {/* LAYER 1 — PLAIN STORY                                             */}
      {/* ================================================================= */}
      <section aria-label={uiCopy.layer1Label}>
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
              {project.index}
            </span>
            <span aria-hidden="true" className="text-[#D4D4D8]">
              ·
            </span>
            <span className="rounded-md border border-[#E4E4E7] bg-white px-2.5 py-1 font-mono text-xs text-[#52525B]">
              {project.statusTag}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-[#111827] [text-wrap:balance] sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#52525B]">
                {project.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToUnderTheHood}
              className="group inline-flex min-h-[40px] shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2 font-mono text-xs font-medium text-[#2563EB] whitespace-nowrap transition-all duration-150 hover:border-[#2563EB] hover:bg-[#2563EB]/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:self-auto"
            >
              <span>{jumpLabel}</span>
              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Real photo/screenshot wireframe placeholder */}
        <div className="group rounded-2xl border border-[#E4E4E7] bg-white p-3 transition-colors duration-200 hover:border-[#D4D4D8]">
          <WireframeSlot
            label={project.wireframeLabel}
            sublabel={project.wireframeSublabel}
            variant={project.id === 'cantonese-voice' ? 'hardware' : 'inventory'}
            aspectClass="aspect-[16/9]"
          />
          <p className="px-2 pt-3 pb-1 text-xs leading-relaxed text-[#52525B]">
            {project.layer1.heroCaption}
          </p>
        </div>

        {/* 2-column Before vs. After comparison cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-colors duration-200 hover:border-[#D4D4D8]">
            <div className="mb-4 flex items-center justify-between border-b border-[#E4E4E7] pb-3">
              <h2 className="text-base font-semibold tracking-tight text-[#111827]">
                {project.layer1.beforeTitle}
              </h2>
              <span className="font-mono text-xs text-[#52525B]">01</span>
            </div>
            <ul className="space-y-1.5">
              {project.layer1.beforePoints.map((pt, idx) => (
                <li
                  key={idx}
                  className="group/item flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm leading-relaxed text-[#52525B] transition-all duration-150 hover:translate-x-0.5 hover:bg-[#FAFAFA] hover:text-[#111827]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-[#A1A1AA] transition-transform duration-150 group-hover/item:scale-125 group-hover/item:border-[#111827]"
                    aria-hidden="true"
                  />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-colors duration-200 hover:border-[#D4D4D8]">
            <div className="mb-4 flex items-center justify-between border-b border-[#E4E4E7] pb-3">
              <h2 className="text-base font-semibold tracking-tight text-[#111827]">
                {project.layer1.afterTitle}
              </h2>
              <span className="font-mono text-xs font-medium text-[#2563EB]">
                02
              </span>
            </div>
            <ul className="space-y-1.5">
              {project.layer1.afterPoints.map((pt, idx) => (
                <li
                  key={idx}
                  className="group/item flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm leading-relaxed text-[#111827] transition-all duration-150 hover:translate-x-0.5 hover:bg-[#FAFAFA]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB] transition-transform duration-150 group-hover/item:scale-125"
                    aria-hidden="true"
                  />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real Cantonese Example placeholder card */}
        <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-6 transition-colors duration-200 hover:border-[#D4D4D8]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E4E7] pb-3.5">
            <div className="flex items-center gap-2">
              <MessageSquare
                className="h-4 w-4 text-[#2563EB]"
                aria-hidden="true"
              />
              <h2 className="text-base font-semibold tracking-tight text-[#111827]">
                {project.layer1.exampleTitle}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#52525B]">
              {project.layer1.exampleSubtitle}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] p-4 transition-colors duration-150 hover:border-[#D4D4D8] hover:bg-white">
              <p className="font-mono text-[11px] text-[#52525B]">
                {project.layer1.spokenLabel}
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#111827]">
                {project.layer1.spokenUtterance}
              </p>
            </div>

            <div className="rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] p-4 transition-colors duration-150 hover:border-[#2563EB]/40 hover:bg-white">
              <p className="font-mono text-[11px] text-[#2563EB]">
                {project.layer1.responseLabel}
              </p>
              <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#111827]">
                {project.layer1.systemOutcome}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[#52525B]">
            {project.layer1.exampleNote}
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HORIZONTAL DIVIDER: ● UNDER THE HOOD ●                            */}
      {/* ================================================================= */}
      <div
        id="under-the-hood"
        className="my-14 flex scroll-mt-20 items-center gap-4"
      >
        <div className="h-px flex-1 bg-[#E4E4E7]" />
        <span className="shrink-0 font-mono text-xs font-medium tracking-wider text-[#2563EB]">
          {uiCopy.dividerLabel}
        </span>
        <div className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      {/* ================================================================= */}
      {/* LAYER 2 — TECHNICAL DEPTH                                         */}
      {/* ================================================================= */}
      <section aria-label={uiCopy.layer2Label}>
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-mono text-xs text-[#52525B]">
              {uiCopy.layer2Label}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#111827]">
              {project.layer2.flowTitle}
            </h2>
          </div>
          <p className="text-xs text-[#52525B]">{project.layer2.flowCaption}</p>
        </div>

        {/* Interactive box-and-arrow System Flow diagram */}
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 sm:p-6">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
            {project.layer2.flowNodes.map((node, idx) => {
              const isHighlighted = activeFlowIdx === idx;
              const isPastOrCurrent =
                activeFlowIdx !== null && idx <= activeFlowIdx;
              const isArrowActive =
                activeFlowIdx !== null && idx < activeFlowIdx;

              return (
                <div
                  key={node.id}
                  className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveFlowIdx(idx)}
                    onMouseLeave={() => setActiveFlowIdx(null)}
                    onFocus={() => setActiveFlowIdx(idx)}
                    onBlur={() => setActiveFlowIdx(null)}
                    onClick={() =>
                      setActiveFlowIdx((prev) => (prev === idx ? null : idx))
                    }
                    className={`w-full flex-1 rounded-lg border p-3.5 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      isHighlighted
                        ? '-translate-y-0.5 border-[#2563EB] bg-[#2563EB]/[0.04]'
                        : isPastOrCurrent
                          ? 'border-[#2563EB]/40 bg-[#FAFAFA]'
                          : 'border-[#E4E4E7] bg-[#FAFAFA] hover:border-[#D4D4D8]'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-medium text-[#2563EB] tabular-nums">
                      {node.step}
                    </span>
                    <p className="mt-1 text-xs font-semibold tracking-tight text-[#111827]">
                      {node.label}
                    </p>
                    <p className="mt-1 font-mono text-[11px] leading-snug text-[#52525B]">
                      {node.detail}
                    </p>
                  </button>

                  {idx < project.layer2.flowNodes.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className={`flex shrink-0 items-center justify-center transition-all duration-150 ${
                        isArrowActive
                          ? 'translate-x-0.5 text-[#2563EB]'
                          : 'text-[#A1A1AA]'
                      }`}
                    >
                      <ArrowDown className="h-4 w-4 lg:hidden" />
                      <ArrowRight className="hidden h-4 w-4 lg:block" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Structured Depth Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {project.layer2.cards.map((card, cardIdx) => (
            <motion.div
              key={card.index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.28,
                delay: cardIdx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4D4D8]"
            >
              <div className="mb-3.5 flex items-center justify-between border-b border-[#E4E4E7] pb-3">
                <h3 className="text-base font-semibold tracking-tight text-[#111827]">
                  {card.title}
                </h3>
                <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                  {card.index}
                </span>
              </div>
              <ul className="space-y-1.5">
                {card.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="group/item flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm leading-relaxed text-[#52525B] transition-all duration-150 hover:translate-x-0.5 hover:bg-[#FAFAFA] hover:text-[#111827]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB] transition-transform duration-150 group-hover/item:scale-125"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom back button for effortless return */}
        <div className="mt-10 flex justify-start border-t border-[#E4E4E7] pt-8">
          <button
            type="button"
            onClick={onBackHome}
            className="group inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-4 py-2 text-sm font-medium text-[#111827] whitespace-nowrap transition-all duration-150 hover:border-[#D4D4D8] hover:bg-[#F4F4F5]/60 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <ArrowLeft
              className="h-4 w-4 text-[#52525B] transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:text-[#111827]"
              aria-hidden="true"
            />
            <span>{backLabel}</span>
          </button>
        </div>
      </section>
    </main>
  );
}
