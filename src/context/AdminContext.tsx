import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, BlogPost, Program } from '../types';
import { AdminService } from '../services/adminService';

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
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addBusiness: (business: Omit<Business, 'id'>) => Promise<void>;
  removeBusiness: (id: string) => Promise<void>;
  updateBusiness: (id: string, business: Partial<Business>) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  removeBlogPost: (id: string) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<void>;
  addRegistration: (registration: any) => Promise<void>;
  getRegistrations: () => any[];
  removeRegistration: (id: string) => Promise<void>;
  updateRegistrationPrice: (price: number) => Promise<void>;
  updateContactInfo: (info: ContactInfo) => Promise<void>;
  updateSocialMediaLinks: (links: SocialMediaLinks) => Promise<void>;
  updateAdminPassword: (newPassword: string) => Promise<void>;
  sendContactMessage: (message: { name: string; email: string; message: string }) => void;
  refreshData: () => Promise<void>;
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
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [registrationPrice, setRegistrationPrice] = useState(3000);
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
  const [adminPassword, setAdminPassword] = useState('kingdomstudio2025');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [
        businessesData,
        blogPostsData,
        programsData,
        priceData,
        contactData,
        socialData
      ] = await Promise.all([
        AdminService.getBusinesses(),
        AdminService.getBlogPosts(),
        AdminService.getPrograms(),
        AdminService.getRegistrationPrice(),
        AdminService.getContactInfo(),
        AdminService.getSocialMediaLinks()
      ]);

      setBusinesses(businessesData);
      setBlogPosts(blogPostsData);
      setPrograms(programsData);
      setRegistrationPrice(priceData);
      setContactInfo(contactData);
      setSocialMediaLinks(socialData);

      // Load registrations only if authenticated
      if (AdminService.isAdminAuthenticated()) {
        const registrationsData = await AdminService.getRegistrations();
        setRegistrations(registrationsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  useEffect(() => {
    loadData();
    
    // Check if user was previously authenticated
    const authStatus = localStorage.getItem('kbs-admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const success = await AdminService.login(username, password);
      if (success) {
        setIsAuthenticated(true);
        localStorage.setItem('kbs-admin-auth', 'true');
        // Refresh data after login to load registrations
        await refreshData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kbs-admin-auth');
    localStorage.removeItem('kbs-admin-session');
    setRegistrations([]); // Clear registrations on logout
  };

  const addBusiness = async (business: Omit<Business, 'id'>) => {
    try {
      await AdminService.addBusiness(business);
      await refreshData();
    } catch (error) {
      console.error('Error adding business:', error);
      throw error;
    }
  };

  const removeBusiness = async (id: string) => {
    try {
      await AdminService.removeBusiness(id);
      await refreshData();
    } catch (error) {
      console.error('Error removing business:', error);
      throw error;
    }
  };

  const updateBusiness = async (id: string, business: Partial<Business>) => {
    try {
      await AdminService.updateBusiness(id, business);
      await refreshData();
    } catch (error) {
      console.error('Error updating business:', error);
      throw error;
    }
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      await AdminService.addBlogPost(post);
      await refreshData();
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  };

  const removeBlogPost = async (id: string) => {
    try {
      await AdminService.removeBlogPost(id);
      await refreshData();
    } catch (error) {
      console.error('Error removing blog post:', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      await AdminService.updateBlogPost(id, post);
      await refreshData();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  };

  const updateProgram = async (id: string, program: Partial<Program>) => {
    try {
      await AdminService.updateProgram(id, program);
      await refreshData();
    } catch (error) {
      console.error('Error updating program:', error);
      throw error;
    }
  };

  const addRegistration = async (registration: any) => {
    try {
      await AdminService.addRegistration(registration);
      // Only refresh if admin is authenticated to see registrations
      if (isAuthenticated) {
        await refreshData();
      }
    } catch (error) {
      console.error('Error adding registration:', error);
      throw error;
    }
  };

  const getRegistrations = () => registrations;

  const removeRegistration = async (id: string) => {
    try {
      await AdminService.removeRegistration(id);
      await refreshData();
    } catch (error) {
      console.error('Error removing registration:', error);
      throw error;
    }
  };

  const updateRegistrationPrice = async (price: number) => {
    try {
      await AdminService.updateRegistrationPrice(price);
      await refreshData();
    } catch (error) {
      console.error('Error updating registration price:', error);
      throw error;
    }
  };

  const updateContactInfo = async (info: ContactInfo) => {
    try {
      await AdminService.updateContactInfo(info);
      await refreshData();
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  };

  const updateSocialMediaLinks = async (links: SocialMediaLinks) => {
    try {
      await AdminService.updateSocialMediaLinks(links);
      await refreshData();
    } catch (error) {
      console.error('Error updating social media links:', error);
      throw error;
    }
  };

  const updateAdminPassword = async (newPassword: string) => {
    try {
      await AdminService.updateAdminPassword(newPassword);
      setAdminPassword(newPassword);
    } catch (error) {
      console.error('Error updating admin password:', error);
      throw error;
    }
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
        programs,
        registrations,
        registrationPrice,
        contactInfo,
        socialMediaLinks,
        adminPassword,
        loading,
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
        refreshData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};