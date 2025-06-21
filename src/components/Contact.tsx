import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  Phone, 
  MapPin, 
  Loader2, 
  Twitter, 
  Instagram 
} from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Replace with your own EmailJS credentials
const YOUR_SERVICE_ID = 'service_sk1bx9g';
const YOUR_TEMPLATE_ID = 'template_8sb1wgc';
const YOUR_PUBLIC_KEY = '11AJ7mWGYb2j_LUhZ';

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear message when user starts typing again
    if (formStatus) {
      setFormStatus(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate EmailJS configuration
    if (!YOUR_SERVICE_ID || YOUR_SERVICE_ID === 'YOUR_SERVICE_ID' ||
        !YOUR_TEMPLATE_ID || YOUR_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
        !YOUR_PUBLIC_KEY || YOUR_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.error('EmailJS configuration is missing. Please provide Service ID, Template ID, and Public Key.');
      setFormStatus({
        success: false,
        message: 'EmailJS configuration is missing. Please check console for details.'
      });
      setIsSubmitting(false);
      return;
    }

    // Send email using EmailJS
    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, e.target as HTMLFormElement, YOUR_PUBLIC_KEY)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setFormStatus({
          success: true,
          message: 'Thank you for your message! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
        setFormStatus({
          success: false,
          message: 'Failed to send message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          
          {/* Page Header */}
          <motion.div variants={titleVariants} className="mb-12">
            
            <motion.h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
            </motion.h2>
            <div className="h-1 w-20 bg-primary rounded mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            
            {/* Contact Form */}
            <motion.div variants={formVariants}>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Status Message */}
                {formStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-md ${
                      formStatus.success 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300'
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Hi, I'd like to discuss a project with you..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 text-white py-3 px-6 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information and Socials */}
            <motion.div 
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Contact Info */}
              <motion.div variants={infoVariants}>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Contact Info</h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Email</h4>
                      <a 
                        href="mailto:dineshbabus309@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        dineshbabus309@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        +91 63005 75551
                      </p>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Vijayawada, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Working Hours */}
{/*               <motion.div variants={infoVariants}>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working Hours</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Monday - Friday:</span>
                    <span className="text-primary font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Saturday:</span>
                    <span className="text-primary font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-300">Sunday:</span>
                    <span className="text-primary font-medium">Closed</span>
                  </div>
                </div>
              </motion.div> */}
              
              {/* Social Links */}
              <motion.div variants={infoVariants}>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {/* GitHub */}
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/Dineshbabu290904"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  
                  {/* LinkedIn */}
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/in/dinesh-babu-surapaneni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  
                  
                  {/* Email */}
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="mailto:dineshbabus309@gmail.com"
                    className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="Send an email"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
