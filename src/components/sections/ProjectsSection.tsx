import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import Section, { Chip, card } from './Section';
import SkeletonImage from '../ui/SkeletonImage';
import { projects } from '../../data/portfolio';

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors';

export default function ProjectsSection() {
  return (
    <Section
      id="projects"
      band
      eyebrow="Projects"
      title="Things I've"
      highlight="built"
      intro="A mix of full-stack products and machine learning work."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className={`${card} overflow-hidden flex flex-col group`}>
            <Link to={`/projects/${project.id}`} className="block" aria-label={`${project.title} details`}>
              <SkeletonImage src={project.image} alt={project.title} className="w-full h-48" />
            </Link>
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mb-1">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  <Link to={`/projects/${project.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <Chip key={h} tone="primary">{h}</Chip>
                ))}
                {project.technologies.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200/70 dark:border-gray-700/60 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link to={`/projects/${project.id}`} className={`${linkClass} text-primary dark:text-primary-light`}>
                  Case study <ArrowUpRight size={16} />
                </Link>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Github size={16} /> Code
                  </a>
                )}
                {project.kaggleUrl && (
                  <a href={project.kaggleUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <FontAwesomeIcon icon={faKaggle} className="w-4 h-4" /> Kaggle
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <ExternalLink size={16} /> Live demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
