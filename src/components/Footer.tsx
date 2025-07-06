import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Crown, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { contactInfo, socialMediaLinks } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-deep-blue text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-mustard-yellow" />
              <div>
                <h3 className="text-xl font-playfair font-bold">Kingdom Business Studio</h3>
                <p className="text-sm text-gray-300">
                  Launch or scale your God-given business with confidence
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 font-inter">
              A Christian-inspired business platform made up of successful businesspeople and 
              devout Christians with a passion for supporting, scaling, and contributing to 
              businesses across various stages of growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-inter">
              <li><Link to="/" className="hover:text-mustard-yellow transition-colors">Home</Link></li>
              <li>
                <button 
                  onClick={() => handleSectionClick('programs')}
                  className="hover:text-mustard-yellow transition-colors text-left"
                >
                  Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('businesses')}
                  className="hover:text-mustard-yellow transition-colors text-left"
                >
                  Businesses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('blog')}
                  className="hover:text-mustard-yellow transition-colors text-left"
                >
                  Blog
                </button>
              </li>
              <li><Link to="/contact" className="hover:text-mustard-yellow transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair font-semibold mb-4">Contact</h4>
            <div className="space-y-2 font-inter text-gray-300">
              <p>Email: {contactInfo.email}</p>
              <p>Phone: {contactInfo.phone}</p>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-mustard-yellow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href={socialMediaLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-mustard-yellow transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href={socialMediaLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-mustard-yellow transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href={socialMediaLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-mustard-yellow transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a 
              href={socialMediaLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-mustard-yellow transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 font-inter">
              © 2025 Kingdom Business Studio. All rights reserved.
            </p>
            <Link 
              to="/admin" 
              className="text-xs text-gray-500 hover:text-mustard-yellow transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;