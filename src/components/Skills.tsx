import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, Database, Brain, Users, User } from 'lucide-react';

const skills = {
  programmingLanguages: [
    { name: 'Python', level: 'Advanced' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'C++', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'HTML', level: 'Intermediate' },
    { name: 'CSS', level: 'Intermediate' },
  ],
  frameworksTools: [
    { name: 'TensorFlow', level: 'Advanced' },
    { name: 'Streamlit', level: 'Intermediate' },
    { name: 'Keras', level: 'Advanced' },
    { name: 'Git', level: 'Advanced' },
    { name: 'OpenCV', level: 'Intermediate' },
  ],
  databases: [
    { name: 'MySQL', level: 'Intermediate' },
    { name: 'MongoDB', level: 'Beginner' },
    { name: 'Firebase', level: 'Intermediate' },
  ],
  specializations: [
    { name: 'Machine Learning', level: 'Intermediate' },
    { name: 'Data Science', level: 'Intermediate' },
    { name: 'Deep Learning', level: 'Intermediate' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate' },
  ],
  intraPersonalSkills: [
    { name: 'Self-Motivation', level: 'Intermediate' },
    { name: 'Adaptability', level: 'Intermediate' },
  ],
  interPersonalSkills: [
    { name: 'Collaboration', level: 'Intermediate' },
    { name: 'Communication', level: 'Intermediate' },
  ],
};

const getLevelPercentage = (level: string) => {
  switch (level) {
    case 'Advanced':
      return 90;
    case 'Intermediate':
      return 70;
    case 'Beginner':
      return 50;
    default:
      return 60;
  }
};

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'programmingLanguages':
      return <Code className="w-6 h-6 text-primary mb-2" />;
    case 'frameworksTools':
      return <Rocket className="w-6 h-6 text-primary mb-2" />;
    case 'databases':
      return <Database className="w-6 h-6 text-primary mb-2" />;
    case 'specializations':
      return <Brain className="w-6 h-6 text-primary mb-2" />;
    case 'intraPersonalSkills':
      return <User className="w-6 h-6 text-primary mb-2" />;
    case 'interPersonalSkills':
      return <Users className="w-6 h-6 text-primary mb-2" />;
    default:
      return null;
  }
};


export default function Skills() {
  return (
    <section id="skills" className="py-20"> {/* Slightly darker background */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">My Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid layout for categories */}
            {Object.entries(skills).map(([categoryName, skillList]) => (
              <div key={categoryName} className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
                  {getCategoryIcon(categoryName)}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{categoryName.replace(/([A-Z])/g, ' $1').trim()}</h3> {/* Improved category title */}
                </div>
                <ul className="space-y-3">
                  {skillList.map((skill) => (
                    <li key={skill.name} className="relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                        <div
                          className="bg-primary dark:bg-secondary h-2.5 rounded-full"
                          style={{ width: `${getLevelPercentage(skill.level)}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
