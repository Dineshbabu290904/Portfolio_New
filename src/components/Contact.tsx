import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send, 
  Phone, 
  MapPin, 
  Loader2,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Replace with your own EmailJS credentials
// EmailJS config: override via VITE_EMAILJS_* env vars, falling back to the current account.
const YOUR_SERVICE_ID: string = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_sk1bx9g';
const YOUR_TEMPLATE_ID: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_8sb1wgc';
const YOUR_PUBLIC_KEY: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '11AJ7mWGYb2j_LUhZ';

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
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          
          <motion.header variants={titleVariants} className="mb-10 md:mb-14 max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3">
              Contact
            </p>
            <h2 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">talk</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Open to conversations about engineering, collaborations and interesting problems. Send a message or reach me directly.
            </p>
          </motion.header>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm p-6 sm:p-8 md:p-12">
            
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
                        Hyderabad, Telangana, India
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
                <div className="flex flex-wrap items-center gap-3">
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
                  <a
                    href="https://drive.google.com/file/d/1YVFvsOYMxXpIjebbppfKYDIlXDz0ZhtT/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/40 text-primary dark:text-primary-light text-sm font-semibold hover:bg-primary/10 transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Resume
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
