import { ArrowUpRight } from 'lucide-react';

const LINKS = {
  Services: ['AI Automation', 'SaaS Development', 'Mobile Apps', 'Cloud Infrastructure'],
  Company: ['About', 'Projects', 'Process', 'Pricing'],
  Connect: ['Contact', 'Book a call', 'LinkedIn', 'Twitter'],
};

const LINK_HREFS: Record<string, string> = {
  'AI Automation': '#services',
  'SaaS Development': '#services',
  'Mobile Apps': '#services',
  'Cloud Infrastructure': '#services',
  About: '#about',
  Projects: '#projects',
  Process: '#process',
  Pricing: '#pricing',
  Contact: '#contact',
  'Book a call': '#contact',
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0F1012] pt-24 pb-10 text-[#F2EFE9]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[13px] font-bold text-[#F2EFE9]">
                S
              </span>
              <span className="text-[15px] font-bold tracking-[0.02em] text-[#F2EFE9]">SMORSE</span>
            </div>
            <p className="mt-4 max-w-[24ch] text-[14px] leading-[1.7] text-[#8A8C91]">
              Premium software, intelligent automations and high-converting digital products.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#F2EFE9]">
                {heading}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {items.map((l) => (
                  <li key={l}>
                    <a
                      href={LINK_HREFS[l] || '#'}
                      className="group inline-flex items-center gap-1.5 text-[14px] text-[#B7B8BB] transition-all duration-300 hover:-translate-y-px hover:text-white"
                    >
                      {l}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-[#8A8C91]">
            © {new Date().getFullYear()} SMORSE. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Privacy
            </a>
            <a href="#" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Terms
            </a>
            <a href="#" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
