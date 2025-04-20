import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary dark:text-primary-light mb-8 text-center">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczO3WuHBOLUHiiEIeBy3lZSLLsKBko7p4RBTDQYt1v2Pt8urfHdKXvX6VqSjLGiwggtIW4t18WaIPyH3p4Y5WOahWbJeCA9nk0rZSNevSH3krUvGy-ur4qmuxU5zrlQW2jNiLTUXMMNY_t_EJbr5TPxO=w1544-h1469-s-no-gm?authuser=0?w=600&h=600&fit=crop&crop=faces"
                alt="Professional headshot"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>Vijayawda, Andhra Pradesh</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Briefcase className="w-5 h-5" />
                <span>Aspiring Data Scientist &amp; Software Developer</span>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  A dedicated and detail-focused Data Science student with a solid background in statistical analysis, machine learning, and programming. Eager to find opportunities to apply analytical and technical skills to tackle real-world challenges, extract meaningful insights, and contribute to innovative projects within a dynamic organization.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  I specialize in developing innovative solutions that bridge the gap between complex data problems and real-world applications. My approach combines strong theoretical foundations with practical implementation skills.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not working on AI/ML projects, I enjoy contributing to open-source projects and staying updated with the latest developments in the field. I believe in continuous learning and applying cutting-edge technologies to solve real-world problems.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}