import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow: string;
  eyebrowIcon?: ReactNode;
  title: string;
  highlight: string;
  subtitle?: string;
  as?: 'h1' | 'h2';
  tone?: 'primary' | 'secondary';
}

// Shared section header used by every page: eyebrow pill, two-tone title, accent bar, optional subtitle.
export default function PageHeader({
  eyebrow,
  eyebrowIcon,
  title,
  highlight,
  subtitle,
  as = 'h1',
  tone = 'primary',
}: PageHeaderProps) {
  const Heading = as;
  const gradient = tone === 'primary' ? 'from-primary to-secondary' : 'from-secondary to-primary';
  const pill =
    tone === 'primary'
      ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
      : 'bg-secondary/10 dark:bg-secondary/20 text-secondary-dark dark:text-secondary-light';

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
    >
      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-[0.12em] rounded-full ${pill}`}>
        {eyebrowIcon}
        {eyebrow}
      </span>
      <Heading className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
        {title}{' '}
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>{highlight}</span>
      </Heading>
      <div className={`mt-5 mx-auto w-20 h-1 bg-gradient-to-r ${gradient} rounded-full`} />
      {subtitle && (
        <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
