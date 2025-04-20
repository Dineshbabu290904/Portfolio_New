import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faKaggle } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

function Projects() {
  const projects = [
    {
      title: "Bone Fracture Detection",
      description: "Developed deep learning models to detect bone fractures in X-ray images using CNN architecture. Achieved 92% accuracy on test dataset.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Scikit-learn"],
      kaggleUrl: "https://www.kaggle.com/code/dineshbabusurapaneni/machine-learning-capstone-one-fracture",
      githubUrl: "",
      demoUrl: "",
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop'
    },
    {
      title: "DigiMart",
      description: "E-commerce application connecting farmers and buyers, enhancing market transparency through real-time pricing and demand analysis.",
      technologies: ["HTML", "JavaScript", "CSS", "Java", "Servlets", "MySQL"],
      kaggleUrl: "",
      githubUrl: "https://github.com/Dineshbabu290904/DigiMart",
      demoUrl: "",
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Github className="w-6 h-6 text-primary" />
                      </a>
                    )}
                    {project.kaggleUrl && (
                      <a
                        href={project.kaggleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <FontAwesomeIcon icon={faKaggle} className="w-6 h-6 text-primary" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-6 h-6 text-primary" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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

export default Projects;