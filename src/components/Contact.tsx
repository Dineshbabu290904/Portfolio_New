import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const YOUR_SERVICE_ID = 'service_sk1bx9g';
const YOUR_TEMPLATE_ID = 'template_8sb1wgc';
const YOUR_PUBLIC_KEY = '11AJ7mWGYb2j_LUhZ';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setFormMessage('Sending...');

    if (!YOUR_SERVICE_ID || YOUR_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      !YOUR_TEMPLATE_ID || YOUR_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      !YOUR_PUBLIC_KEY || YOUR_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.error('EmailJS configuration is missing. Please provide Service ID, Template ID, and Public Key.');
      setFormMessage('EmailJS configuration is missing. Please check console for details.');
      setIsError(true);
      return;
    }


    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, e.target as HTMLFormElement, YOUR_PUBLIC_KEY)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setFormMessage('Message sent successfully!');
        setIsSuccess(true);
        setIsError(false);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
      }, (error) => {
        console.log('FAILED...', error.text);
        setFormMessage('Failed to send message. Please try again later.');
        setIsError(true);
        setIsSuccess(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
              {formMessage && (
                <div className={`mt-4 p-3 rounded-md text-center ${isSuccess ? 'bg-green-100 text-green-700' : (isError ? 'bg-red-100 text-red-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300')}`}>
                  {formMessage}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:dineshbabus309@gmail.com"
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>dineshbabus309@gmail.com</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Connect with Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Dineshbabu290904"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dinesh-babu-surapaneni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:dineshbabus309@gmail.com"
                    className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
