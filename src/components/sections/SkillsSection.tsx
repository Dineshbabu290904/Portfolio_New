import Section, { card } from './Section';
import { skillGroups } from '../../data/portfolio';

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I"
      highlight="work with"
      intro="Grouped by area. A filled dot marks the tools I'm most fluent in."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className={`${card} p-6`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200/80 dark:border-gray-600/60 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-800 dark:text-gray-100"
                >
                  {skill.level && (
                    <span
                      title={`${skill.level} proficiency`}
                      aria-label={`${skill.level} proficiency`}
                      className={`w-2 h-2 rounded-full ${
                        skill.level === 'Advanced'
                          ? 'bg-primary dark:bg-primary-light'
                          : 'border-2 border-primary/60 dark:border-primary-light/60'
                      }`}
                    />
                  )}
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
