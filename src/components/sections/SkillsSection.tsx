import Section from './Section';
import { RevealGroup, RevealItem } from '../motion/Reveal';
import { Marquee } from '../motion/Atmosphere';
import { skillGroups } from '../../data/portfolio';

const technical = skillGroups.filter((g) => g.title !== 'Ways of working');
const allSkills = technical.flatMap((g) => g.skills.map((s) => s.name));
const half = Math.ceil(allSkills.length / 2);
const rows = [allSkills.slice(0, half), allSkills.slice(half)];

function MarqueeRow({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`font-display font-extrabold tracking-tight text-5xl md:text-7xl px-6 ${
              outline ? 'text-outline' : 'text-gray-900 dark:text-white'
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="text-secondary text-3xl md:text-5xl">✦</span>
        </span>
      ))}
    </>
  );
}

export default function SkillsSection() {
  return (
    <>
      {/* Two big rows drifting in opposite directions; they speed up with the scroll */}
      <div aria-hidden="true" className="py-10 md:py-14 -rotate-2 select-none">
        <Marquee baseVelocity={-0.5} className="py-2">
          <MarqueeRow items={rows[0]} />
        </Marquee>
        <Marquee baseVelocity={0.5} className="py-2">
          <MarqueeRow items={rows[1]} outline />
        </Marquee>
      </div>

      <Section
        id="skills"
        chapter="03"
        eyebrow="Skills"
        title="What I"
        highlight="work with"
        intro="Grouped by area. A filled dot marks the tools I'm most fluent in."
      >
        <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {skillGroups.map((group, i) => (
            <RevealItem key={group.title} className="border-t border-gray-300/70 dark:border-gray-700 pt-5">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{group.title}</h3>
                <span className="font-mono text-xs text-gray-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group flex items-center justify-between gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="h-px w-0 bg-secondary transition-all duration-300 group-hover:w-4" />
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span
                        title={`${skill.level} proficiency`}
                        aria-label={`${skill.level} proficiency`}
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          skill.level === 'Advanced'
                            ? 'bg-primary dark:bg-primary-light'
                            : 'border-2 border-primary/60 dark:border-primary-light/60'
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
