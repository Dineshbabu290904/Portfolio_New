import { Download, GraduationCap, MapPin, Award } from 'lucide-react';
import Section, { Chip, card } from './Section';
import { CountUp, RevealGroup, RevealItem } from '../motion/Reveal';
import { certifications, education, highlights, profile } from '../../data/portfolio';

export default function AboutSection() {
  return (
    <Section id="about" eyebrow="About" title="Engineer by trade," highlight="data nerd at heart">
      <RevealGroup className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]" stagger={0.15}>
        {/* Profile card */}
        <RevealItem className={`${card} p-6 flex flex-col gap-5 self-start`}>
          <img
            src={`${import.meta.env.BASE_URL}asserts/about.jpg`}
            alt={profile.name}
            loading="lazy"
            className="w-full aspect-square object-cover object-[50%_20%] rounded-xl"
          />
          <div>
            <p className="font-display text-xl font-bold text-gray-900 dark:text-white">{profile.name}</p>
            <p className="text-sm text-primary dark:text-primary-light font-medium">
              {profile.role} · {profile.company}
            </p>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-gray-400 shrink-0" /> {profile.location}
            </li>
            <li className="flex items-center gap-2.5">
              <GraduationCap size={16} className="text-gray-400 shrink-0" /> B.Tech CSE (Data Science), PVPSIT
            </li>
          </ul>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            <Download size={16} /> View resume
          </a>
        </RevealItem>

        <RevealItem className="flex flex-col gap-6 min-w-0">
          {/* Bio */}
          <div className={`${card} p-6 md:p-8`}>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-[65ch]">
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Chip key={interest}>{interest}</Chip>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <RevealGroup as="dl" className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.1}>
            {highlights.map((item) => (
              <RevealItem key={item.label} lift={4} className={`${card} p-4 flex flex-col gap-1 hover:shadow-lg transition-shadow duration-300`}>
                <dt className="order-2 text-xs text-gray-500 dark:text-gray-400 leading-snug">{item.label}</dt>
                <dd className="order-1 font-display text-2xl md:text-3xl font-extrabold tabular-nums text-gray-900 dark:text-white">
                  <CountUp value={item.value} />
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Education + certifications */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className={`${card} p-6`}>
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white mb-4">
                <GraduationCap size={18} className="text-primary dark:text-primary-light" /> Education
              </h3>
              <ul className="space-y-4">
                {education.map((item) => (
                  <li key={item.degree}>
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{item.degree}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.institution}</p>
                    <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mt-0.5 tabular-nums">
                      {item.duration}
                      {item.note && ` · ${item.note}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-6`}>
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white mb-4">
                <Award size={18} className="text-amber-500" /> Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-semibold text-gray-800 dark:text-gray-100 text-sm">{cert.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</span>
                    </span>
                    <span className="font-mono text-xs text-gray-500 tabular-nums shrink-0">{cert.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
