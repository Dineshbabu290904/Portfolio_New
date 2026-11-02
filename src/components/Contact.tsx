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
import { Magnetic } from './motion/Atmosphere';
import { ChapterNumber } from './motion/Scroll';
import { SplitText } from './motion/Reveal';
import { profile } from '../data/portfolio';

// Messages go through FormSubmit (https://formsubmit.co): free, no account and no API keys. It emails
// each submission to the address below. The very first submission sends a one-time confirmation
// email to that inbox; after it is confirmed, messages are delivered. If the service can't be
// reached, the form falls back to opening the visitor's own email app with the message filled in.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

type Status = { success: boolean; message: string; mailto?: string } | null;

const mailtoFor = (data: { name: string; email: string; subject: string; message: string }) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(data.subject || `Hello from ${data.name}`)}&body=${encodeURIComponent(
    `${data.message}\n\n— ${data.name} (${data.email})`,
  )}`;

// The message form, shared by the desktop and mobile layouts.
export function ContactForm({ compact = false }: { compact?: boolean }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Spam trap: hidden from people, filled in by bots.
  const [honey, setHoney] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<Status>(null);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear message when user starts typing again
    if (formStatus) {
      setFormStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // a bot filled the hidden field
    setIsSubmitting(true);
    const mailto = mailtoFor(formData);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `Portfolio: ${formData.subject}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message || `HTTP ${response.status}`);
      setFormStatus({ success: true, message: "Thanks for your message! I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      // Offer the visitor's own email app with everything already written, so the message isn't lost.
      setFormStatus({
        success: false,
        message: "The message couldn't be sent from here.",
        mailto,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Status Message */}
      {formStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className={`p-4 rounded-md ${
            formStatus.success
              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300'
              : 'bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200'
          }`}
        >
          {formStatus.message}
          {formStatus.mailto && (
            <>
              {' '}
              <a href={formStatus.mailto} className="font-semibold underline underline-offset-2">
                Send it from your email app instead
              </a>{' '}
              or write to <a href={`mailto:${profile.email}`} className="underline underline-offset-2">{profile.email}</a>.
            </>
          )}
        </motion.div>
      )}

      {/* Spam trap: visually hidden and skipped by keyboard and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>
      </div>

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
          rows={compact ? 4 : 5}
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
  );
}

export default function Contact() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          
          <header className="relative mb-12 md:mb-16">
            <ChapterNumber value="05" className="absolute right-0 -top-10 md:-top-16" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-primary to-secondary" />
              Contact
            </p>
            <SplitText
              id="contact-title"
              className="font-display text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[0.95]"
              segments={[
                { text: "Let's" },
                { text: 'talk.', className: 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary' },
              ]}
            />
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Open to conversations about engineering, collaborations and interesting problems. Send a message or reach me directly.
            </p>
            <Magnetic className="mt-8" strength={0.25}>
              <a
                href="mailto:dineshbabus309@gmail.com"
                data-cursor="Write"
                className="group relative inline-block font-display text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white"
              >
                dineshbabus309@gmail.com
                <span aria-hidden="true" className="absolute left-0 -bottom-1 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden="true" className="absolute left-0 -bottom-1 h-px w-full bg-gray-300 dark:bg-gray-700 -z-10" />
              </a>
            </Magnetic>
          </header>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/80 shadow-sm p-6 sm:p-8 md:p-12">
            
            {/* Contact Form */}
            <motion.div variants={formVariants}>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send a Message</h3>
              
              <ContactForm />
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
