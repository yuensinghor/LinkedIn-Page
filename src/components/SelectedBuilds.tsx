import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProjectCaseStudy, ProjectId, SiteCopy } from '../data/portfolioContent';
import { WireframeSlot } from './WireframeSlot';

interface SelectedBuildsProps {
  copy: SiteCopy['builds'];
  projects: Record<ProjectId, ProjectCaseStudy>;
  onSelectProject: (projectId: ProjectId) => void;
}

export function SelectedBuilds({
  copy,
  projects,
  onSelectProject,
}: SelectedBuildsProps) {
  const orderedProjects: ProjectCaseStudy[] = [
    projects['home-inventory'],
    projects['cantonese-voice'],
  ];

  // Strip trailing arrow from label so we can animate a crisp Lucide arrow icon smoothly
  const ctaLabel = copy.readCaseStudy.replace(/\s*→\s*$/, '');

  return (
    <section
      id="projects"
      className="mx-auto max-w-[1100px] scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
    >
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
        {orderedProjects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col justify-between rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#D4D4D8] sm:p-6"
          >
            <div>
              {/* Clean monospace number + status metadata */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                  {project.index}
                </span>
                <span className="truncate font-mono text-xs text-[#52525B] transition-colors duration-150 group-hover:text-[#111827]">
                  {project.statusTag}
                </span>
              </div>

              {/* Project wireframe slot */}
              <WireframeSlot
                label={project.wireframeLabel}
                sublabel={project.wireframeSublabel}
                variant={
                  project.id === 'cantonese-voice' ? 'hardware' : 'inventory'
                }
                aspectClass="aspect-[16/10]"
              />

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#111827] transition-colors duration-150 group-hover:text-[#2563EB]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B] sm:text-[15px]">
                {project.summary}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E4E4E7] pt-4">
              <button
                type="button"
                onClick={() => onSelectProject(project.id)}
                className="group/btn inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#111827] whitespace-nowrap transition-all duration-150 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>{ctaLabel}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
