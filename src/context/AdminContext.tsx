import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, BlogPost, Program } from '../types';
import { mockBusinesses, mockBlogPosts, programs } from '../data/mockData';

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  location: string;
}

interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  businesses: Business[];
  blogPosts: BlogPost[];
  programs: Program[];
  registrations: any[];
  registrationPrice: number;
  contactInfo: ContactInfo;
  socialMediaLinks: SocialMediaLinks;
  adminPassword: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addBusiness: (business: Omit<Business, 'id'>) => void;
  removeBusiness: (id: string) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  removeBlogPost: (id: string) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  addRegistration: (registration: any) => void;
  getRegistrations: () => any[];
  removeRegistration: (id: string) => void;
  updateRegistrationPrice: (price: number) => void;
  updateContactInfo: (info: ContactInfo) => void;
  updateSocialMediaLinks: (links: SocialMediaLinks) => void;
  updateAdminPassword: (newPassword: string) => void;
  sendContactMessage: (message: { name: string; email: string; message: string }) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [programsData, setProgramsData] = useState<Program[]>(programs);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [registrationPrice, setRegistrationPrice] = useState(3000);
  const [adminPassword, setAdminPassword] = useState('kingdomstudio2025');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+254 700 123 456',
    email: 'info@kingdombusinessstudio.com',
    whatsapp: '+254700123456',
    location: 'Nairobi, Kenya',
  });
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLinks>({
    facebook: 'https://facebook.com/kingdombusinessstudio',
    instagram: 'https://instagram.com/kingdombusinessstudio',
    twitter: 'https://twitter.com/kingdombusiness',
    linkedin: 'https://linkedin.com/company/kingdom-business-studio',
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('kbs-admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Load saved data from localStorage
    const savedBusinesses = localStorage.getItem('kbs-businesses');
    if (savedBusinesses) {
      setBusinesses(JSON.parse(savedBusinesses));
    }

    const savedBlogPosts = localStorage.getItem('kbs-blog-posts');
    if (savedBlogPosts) {
      setBlogPosts(JSON.parse(savedBlogPosts));
    }

    const savedPrograms = localStorage.getItem('kbs-programs');
    if (savedPrograms) {
      setProgramsData(JSON.parse(savedPrograms));
    }

    const savedRegistrations = localStorage.getItem('kbs-registrations');
    if (savedRegistrations) {
      setRegistrations(JSON.parse(savedRegistrations));
    }

    const savedPrice = localStorage.getItem('kbs-registration-price');
    if (savedPrice) {
      setRegistrationPrice(JSON.parse(savedPrice));
    }

    const savedContactInfo = localStorage.getItem('kbs-contact-info');
    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo));
    }

    const savedSocialMedia = localStorage.getItem('kbs-social-media');
    if (savedSocialMedia) {
      setSocialMediaLinks(JSON.parse(savedSocialMedia));
    }

    const savedPassword = localStorage.getItem('kbs-admin-password');
    if (savedPassword) {
      setAdminPassword(savedPassword);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('kbs-admin-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kbs-admin-auth');
  };

  const addBusiness = (business: Omit<Business, 'id'>) => {
    const newBusiness = { ...business, id: Date.now().toString() };
    const updatedBusinesses = [...businesses, newBusiness];
    setBusinesses(updatedBusinesses);
    localStorage.setItem('kbs-businesses', JSON.stringify(updatedBusinesses));
  };

  const removeBusiness = (id: string) => {
    const updatedBusinesses = businesses.filter(b => b.id !== id);
    setBusinesses(updatedBusinesses);
    localStorage.setItem('kbs-businesses', JSON.stringify(updatedBusinesses));
  };

  const updateBusiness = (id: string, business: Partial<Business>) => {
    const updatedBusinesses = businesses.map(b => 
      b.id === id ? { ...b, ...business } : b
    );
    setBusinesses(updatedBusinesses);
    localStorage.setItem('kbs-businesses', JSON.stringify(updatedBusinesses));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    const updatedPosts = [newPost, ...blogPosts];
    setBlogPosts(updatedPosts);
    localStorage.setItem('kbs-blog-posts', JSON.stringify(updatedPosts));
  };

  const removeBlogPost = (id: string) => {
    const updatedPosts = blogPosts.filter(p => p.id !== id);
    setBlogPosts(updatedPosts);
    localStorage.setItem('kbs-blog-posts', JSON.stringify(updatedPosts));
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    const updatedPosts = blogPosts.map(p => 
      p.id === id ? { ...p, ...post } : p
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('kbs-blog-posts', JSON.stringify(updatedPosts));
  };

  const updateProgram = (id: string, program: Partial<Program>) => {
    const updatedPrograms = programsData.map(p => 
      p.id === id ? { ...p, ...program } : p
    );
    setProgramsData(updatedPrograms);
    localStorage.setItem('kbs-programs', JSON.stringify(updatedPrograms));
  };

  const addRegistration = (registration: any) => {
    const newRegistration = { ...registration, id: Date.now().toString(), timestamp: new Date().toISOString() };
    const updatedRegistrations = [...registrations, newRegistration];
    setRegistrations(updatedRegistrations);
    localStorage.setItem('kbs-registrations', JSON.stringify(updatedRegistrations));
    
    // Send to Google Sheets (in a real app, this would be a proper API call)
    console.log('Registration data for Google Sheets:', newRegistration);
  };

  const getRegistrations = () => registrations;

  const removeRegistration = (id: string) => {
    const updatedRegistrations = registrations.filter(r => r.id !== id);
    setRegistrations(updatedRegistrations);
    localStorage.setItem('kbs-registrations', JSON.stringify(updatedRegistrations));
  };

  const updateRegistrationPrice = (price: number) => {
    setRegistrationPrice(price);
    localStorage.setItem('kbs-registration-price', JSON.stringify(price));
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    localStorage.setItem('kbs-contact-info', JSON.stringify(info));
  };

  const updateSocialMediaLinks = (links: SocialMediaLinks) => {
    setSocialMediaLinks(links);
    localStorage.setItem('kbs-social-media', JSON.stringify(links));
  };

  const updateAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
    localStorage.setItem('kbs-admin-password', newPassword);
  };

  const sendContactMessage = (message: { name: string; email: string; message: string }) => {
    // Create mailto link with the admin's email
    const subject = encodeURIComponent(`Contact Form Message from ${message.name}`);
    const body = encodeURIComponent(`
Name: ${message.name}
Email: ${message.email}

Message:
${message.message}

---
Sent from Kingdom Business Studio Contact Form
    `);
    
    const mailtoLink = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        businesses,
        blogPosts,
        programs: programsData,
        registrations,
        registrationPrice,
        contactInfo,
        socialMediaLinks,
        adminPassword,
        login,
        logout,
        addBusiness,
        removeBusiness,
        updateBusiness,
        addBlogPost,
        removeBlogPost,
        updateBlogPost,
        updateProgram,
        addRegistration,
        getRegistrations,
        removeRegistration,
        updateRegistrationPrice,
        updateContactInfo,
        updateSocialMediaLinks,
        updateAdminPassword,
        sendContactMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};