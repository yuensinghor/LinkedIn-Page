import { SITE_CONFIG, SiteCopy } from '../data/portfolioContent';

interface FooterProps {
  copy: SiteCopy['footer'];
  onOpenLegal: () => void;
}

export function Footer({ copy, onOpenLegal }: FooterProps) {
  return (
    <footer className="border-t border-[#E4E4E7] bg-white">
      <div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-[#52525B]">{copy.availabilityLine}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#52525B]">
          {[
            {
              href: `mailto:${SITE_CONFIG.emailPlaceholder}`,
              label: copy.emailLabel,
              external: false,
            },
            {
              href: SITE_CONFIG.githubUrl,
              label: copy.githubLabel,
              external: true,
            },
            {
              href: SITE_CONFIG.linkedinUrl,
              label: copy.linkedinLabel,
              external: true,
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="group relative py-0.5 whitespace-nowrap transition-colors duration-150 hover:text-[#111827]"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 bg-[#2563EB] transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}

          <span aria-hidden="true" className="text-[#D4D4D8]">
            ·
          </span>
          <button
            type="button"
            onClick={onOpenLegal}
            className="whitespace-nowrap text-[#52525B] underline decoration-[#D4D4D8] underline-offset-4 transition-colors duration-150 hover:text-[#111827] hover:decoration-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            {copy.legalLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
