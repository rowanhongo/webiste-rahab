import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { ContactForm } from '../types';
import { useAdmin } from '../context/AdminContext';

const Contact: React.FC = () => {
  const { contactInfo, sendContactMessage } = useAdmin();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendContactMessage(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-2xl mx-auto">
              Have questions about our programs or need guidance on your kingdom business journey? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-royal-blue/10 rounded-full">
                      <Phone className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600 font-inter">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-royal-blue/10 rounded-full">
                      <Mail className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600 font-inter">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-royal-blue/10 rounded-full">
                      <MapPin className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600 font-inter">{contactInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-royal-blue/10 rounded-full">
                      <Clock className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600 font-inter">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 font-inter">Sat: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-green-500 text-white px-6 py-3 rounded-full font-inter font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Programs Quick Links */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                  Our Programs
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-royal-blue/5 rounded-lg">
                    <span className="font-inter font-medium text-gray-900">What's in Your Hand</span>
                    <span className="text-royal-blue font-inter text-sm">8-Week Program</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-mustard-yellow/5 rounded-lg">
                    <span className="font-inter font-medium text-gray-900">Net in the Deep</span>
                    <span className="text-mustard-yellow font-inter text-sm">Advanced Track</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-royal-blue/5 rounded-lg">
                    <span className="font-inter font-medium text-gray-900">The Boat</span>
                    <span className="text-royal-blue font-inter text-sm">YouTube Channel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-inter">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    placeholder="Tell us about your business goals, questions, or how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-royal-blue text-white px-6 py-3 rounded-full font-inter font-semibold hover:bg-deep-blue transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;