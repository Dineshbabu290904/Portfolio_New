import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10"
      >
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-2">
          $ cd {pathname}
        </p>
        <p className="font-mono text-sm text-red-500 dark:text-red-400 mb-6">
          bash: no such file or directory
        </p>
        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          This page doesn't exist — it may have moved, or the link may be mistyped.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft size={18} /> Back home
          </Link>
          <Link
            to="/terminal"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Terminal size={18} /> Open terminal
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
