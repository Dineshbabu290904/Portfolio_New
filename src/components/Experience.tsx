import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'Eduskills (Google Virtual)',
    role: 'Artificial Intelligence & Machine Learning Intern',
    duration: '07/2024 - 09/2024',
    location: 'Virtual', // Or remove location if not applicable
    responsibilities: [
      'Developed hands-on expertise in AI/ML concepts, tools, and applications through real-world projects and collaborative learning.',
    ],
    technologies: ['AI/ML Concepts', 'Tools', 'Applications'], // Update technologies if specific ones are mentioned
  },
  // Removed previous experiences and added the new one from resume
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Professional Experience</h2>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full" />

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {experience.role}
                  </h3>
                  <h4 className="text-xl text-primary mb-4">{experience.company}</h4>

                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {experience.duration}
                    </div>
                    {experience.location && ( // Conditionally render location
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {experience.location}
                      </div>
                    )}
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
