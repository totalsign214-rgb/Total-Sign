import { BUSINESS_INFO } from '../data/business';

const CRAFT_PILLARS = [
  {
    index: '01',
    title: 'In-House CNC & Laser Fabrication',
    detail:
      'Precision-cut 3D acrylic, trimcap channel profiles, and routed ACP sheets built directly at our Ranchi workshop for clean edges and accurate mounting.',
  },
  {
    index: '02',
    title: 'Commercial & Mall-Grade Materials',
    detail:
      'From JINDAL star flex glass applications and backlit translite acrylic polysheets to 3M retro reflective films and matte-laminated latex vinyl.',
  },
  {
    index: '03',
    title: 'End-to-End Printing & Fixing',
    detail:
      'Complete production from eco-solvent and latex printing to structural ACP cladding, LED wiring, 4-sided flag poles, and on-site installation.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-amber-700">About Our Workshop</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Practical Signage Craftsmanship from Ranchi to Commercial Hubs Across Jharkhand
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Operating as {BUSINESS_INFO.name} ({BUSINESS_INFO.alternateName}) from{' '}
              {BUSINESS_INFO.addressLine}, Ranchi, we build durable indoor and outdoor
              signage for retail stores, medical centers, shopping malls, and local
              businesses—including completed glass and backlit work at P&amp;M Mall in
              Jamshedpur.
            </p>
            <div className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Workshop Hours</p>
              <p className="mt-1 tabular-nums">{BUSINESS_INFO.hours.weekdays}</p>
              <p className="mt-0.5 text-slate-500">{BUSINESS_INFO.hours.sunday}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {CRAFT_PILLARS.map((pillar) => (
                <div key={pillar.index} className="p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-amber-700 tabular-nums">
                      {pillar.index}.
                    </span>
                    <h3 className="font-display text-lg font-semibold text-slate-900">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
