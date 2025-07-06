import { supabase, supabaseAdmin } from '../lib/supabase';
import { Business, BlogPost, Program } from '../types';

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

export class AdminService {
  // Authentication
  static async login(username: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      const adminPassword = data?.value;
      const isValid = username === 'admin' && password === adminPassword;
      
      if (isValid) {
        // Store admin session
        localStorage.setItem('kbs-admin-session', 'authenticated');
      }
      
      return isValid;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  // Helper method to check admin authentication
  static isAdminAuthenticated(): boolean {
    return localStorage.getItem('kbs-admin-session') === 'authenticated';
  }

  // Get the appropriate client for operations
  static getClient() {
    // Always use supabaseAdmin for write operations to bypass RLS
    return supabaseAdmin;
  }

  // Businesses
  static async getBusinesses(): Promise<Business[]> {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        name: item.name,
        logo: item.logo,
        category: item.category,
        description: item.description,
        isNew: item.is_new
      })) || [];
    } catch (error) {
      console.error('Error in getBusinesses:', error);
      return [];
    }
  }

  static async addBusiness(business: Omit<Business, 'id'>): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('businesses')
        .insert({
          name: business.name,
          logo: business.logo,
          category: business.category,
          description: business.description,
          is_new: business.isNew || false
        });

      if (error) {
        console.error('Error adding business:', error);
        throw new Error(`Failed to add business: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in addBusiness:', error);
      throw error;
    }
  }

  static async updateBusiness(id: string, business: Partial<Business>): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const updateData: any = {};
      if (business.name !== undefined) updateData.name = business.name;
      if (business.logo !== undefined) updateData.logo = business.logo;
      if (business.category !== undefined) updateData.category = business.category;
      if (business.description !== undefined) updateData.description = business.description;
      if (business.isNew !== undefined) updateData.is_new = business.isNew;

      const client = this.getClient();
      const { error } = await client
        .from('businesses')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating business:', error);
        throw new Error(`Failed to update business: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in updateBusiness:', error);
      throw error;
    }
  }

  static async removeBusiness(id: string): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing business:', error);
        throw new Error(`Failed to remove business: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in removeBusiness:', error);
      throw error;
    }
  }

  // Blog Posts
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        author: item.author,
        date: item.date,
        category: item.category,
        imageUrl: item.image_url
      })) || [];
    } catch (error) {
      console.error('Error in getBlogPosts:', error);
      return [];
    }
  }

  static async addBlogPost(post: Omit<BlogPost, 'id'>): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('blog_posts')
        .insert({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date,
          category: post.category,
          image_url: post.imageUrl
        });

      if (error) {
        console.error('Error adding blog post:', error);
        throw new Error(`Failed to add blog post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in addBlogPost:', error);
      throw error;
    }
  }

  static async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const updateData: any = {};
      if (post.title !== undefined) updateData.title = post.title;
      if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
      if (post.content !== undefined) updateData.content = post.content;
      if (post.author !== undefined) updateData.author = post.author;
      if (post.date !== undefined) updateData.date = post.date;
      if (post.category !== undefined) updateData.category = post.category;
      if (post.imageUrl !== undefined) updateData.image_url = post.imageUrl;

      const client = this.getClient();
      const { error } = await client
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating blog post:', error);
        throw new Error(`Failed to update blog post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in updateBlogPost:', error);
      throw error;
    }
  }

  static async removeBlogPost(id: string): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing blog post:', error);
        throw new Error(`Failed to remove blog post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in removeBlogPost:', error);
      throw error;
    }
  }

  // Programs
  static async getPrograms(): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching programs:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        primaryColor: item.primary_color,
        accentColors: item.accent_colors,
        features: item.features
      })) || [];
    } catch (error) {
      console.error('Error in getPrograms:', error);
      return [];
    }
  }

  static async updateProgram(id: string, program: Partial<Program>): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const updateData: any = {};
      if (program.name !== undefined) updateData.name = program.name;
      if (program.description !== undefined) updateData.description = program.description;
      if (program.primaryColor !== undefined) updateData.primary_color = program.primaryColor;
      if (program.accentColors !== undefined) updateData.accent_colors = program.accentColors;
      if (program.features !== undefined) updateData.features = program.features;

      const client = this.getClient();
      const { error } = await client
        .from('programs')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating program:', error);
        throw new Error(`Failed to update program: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in updateProgram:', error);
      throw error;
    }
  }

  // Registrations
  static async getRegistrations(): Promise<any[]> {
    if (!this.isAdminAuthenticated()) {
      return [];
    }

    try {
      const client = this.getClient();
      const { data, error } = await client
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        fullName: item.full_name,
        phoneNumber: item.phone_number,
        country: item.country,
        industry: item.industry,
        businessIdea: item.business_idea,
        openToCollaboration: item.open_to_collaboration,
        bornAgain: item.born_again,
        available8Weeks: item.available_8_weeks,
        timePreference: item.time_preference,
        daysPreference: item.days_preference,
        paymentMethod: item.payment_method,
        paymentProof: item.payment_proof,
        timestamp: item.created_at
      })) || [];
    } catch (error) {
      console.error('Error in getRegistrations:', error);
      return [];
    }
  }

  static async addRegistration(registration: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('registrations')
        .insert({
          full_name: registration.fullName,
          phone_number: registration.phoneNumber,
          country: registration.country,
          industry: registration.industry,
          business_idea: registration.businessIdea,
          open_to_collaboration: registration.openToCollaboration,
          born_again: registration.bornAgain,
          available_8_weeks: registration.available8Weeks,
          time_preference: registration.timePreference,
          days_preference: registration.daysPreference,
          payment_method: registration.paymentMethod,
          payment_proof: registration.paymentProof
        });

      if (error) {
        console.error('Error adding registration:', error);
        throw new Error(`Failed to add registration: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in addRegistration:', error);
      throw error;
    }
  }

  static async removeRegistration(id: string): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing registration:', error);
        throw new Error(`Failed to remove registration: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in removeRegistration:', error);
      throw error;
    }
  }

  // Site Settings
  static async getSetting(key: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return null;
      }
      return data?.value;
    } catch (error) {
      console.error(`Error in getSetting for ${key}:`, error);
      return null;
    }
  }

  static async updateSetting(key: string, value: any): Promise<void> {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Admin authentication required');
    }

    try {
      const client = this.getClient();
      const { error } = await client
        .from('site_settings')
        .upsert({
          key,
          value
        });

      if (error) {
        console.error(`Error updating setting ${key}:`, error);
        throw new Error(`Failed to update setting: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error in updateSetting for ${key}:`, error);
      throw error;
    }
  }

  static async getRegistrationPrice(): Promise<number> {
    const price = await this.getSetting('registration_price');
    return typeof price === 'number' ? price : parseInt(price) || 3000;
  }

  static async updateRegistrationPrice(price: number): Promise<void> {
    await this.updateSetting('registration_price', price);
  }

  static async getContactInfo(): Promise<ContactInfo> {
    const info = await this.getSetting('contact_info');
    return info || {
      phone: '+254 700 123 456',
      email: 'info@kingdombusinessstudio.com',
      whatsapp: '+254700123456',
      location: 'Nairobi, Kenya'
    };
  }

  static async updateContactInfo(info: ContactInfo): Promise<void> {
    await this.updateSetting('contact_info', info);
  }

  static async getSocialMediaLinks(): Promise<SocialMediaLinks> {
    const links = await this.getSetting('social_media_links');
    return links || {
      facebook: 'https://facebook.com/kingdombusinessstudio',
      instagram: 'https://instagram.com/kingdombusinessstudio',
      twitter: 'https://twitter.com/kingdombusiness',
      linkedin: 'https://linkedin.com/company/kingdom-business-studio'
    };
  }

  static async updateSocialMediaLinks(links: SocialMediaLinks): Promise<void> {
    await this.updateSetting('social_media_links', links);
  }

  static async updateAdminPassword(newPassword: string): Promise<void> {
    await this.updateSetting('admin_password', newPassword);
  }
}