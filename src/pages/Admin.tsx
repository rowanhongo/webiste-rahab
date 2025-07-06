import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Eye, EyeOff, Users, FileText, Settings, Building, DollarSign, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Business, BlogPost, Program } from '../types';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    businesses,
    blogPosts,
    programs,
    registrations,
    registrationPrice,
    contactInfo,
    socialMediaLinks,
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
    removeRegistration,
    updateRegistrationPrice,
    updateContactInfo,
    updateSocialMediaLinks,
    updateAdminPassword,
  } = useAdmin();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState('businesses');

  // Form states
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [showAddBlogPost, setShowAddBlogPost] = useState(false);
  const [editingSettings, setEditingSettings] = useState(false);

  const [newBusiness, setNewBusiness] = useState<Omit<Business, 'id'>>({
    name: '',
    logo: '',
    category: '',
    description: '',
    isNew: false,
  });

  const [newBlogPost, setNewBlogPost] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    imageUrl: '',
  });

  const [settingsForm, setSettingsForm] = useState({
    registrationPrice: registrationPrice,
    contactInfo: contactInfo,
    socialMediaLinks: socialMediaLinks,
    newPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setSettingsForm({
        registrationPrice: registrationPrice,
        contactInfo: contactInfo,
        socialMediaLinks: socialMediaLinks,
        newPassword: '',
      });
    }
  }, [isAuthenticated, registrationPrice, contactInfo, socialMediaLinks]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const success = await login(loginForm.username, loginForm.password);
      if (!success) {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddBusiness = async () => {
    try {
      await addBusiness(newBusiness);
      setNewBusiness({ name: '', logo: '', category: '', description: '', isNew: false });
      setShowAddBusiness(false);
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handleUpdateBusiness = async () => {
    if (!editingBusiness) return;
    try {
      await updateBusiness(editingBusiness.id, editingBusiness);
      setEditingBusiness(null);
    } catch (error) {
      console.error('Error updating business:', error);
    }
  };

  const handleAddBlogPost = async () => {
    try {
      await addBlogPost(newBlogPost);
      setNewBlogPost({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        imageUrl: '',
      });
      setShowAddBlogPost(false);
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  const handleUpdateBlogPost = async () => {
    if (!editingBlogPost) return;
    try {
      await updateBlogPost(editingBlogPost.id, editingBlogPost);
      setEditingBlogPost(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleUpdateProgram = async () => {
    if (!editingProgram) return;
    try {
      await updateProgram(editingProgram.id, editingProgram);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateRegistrationPrice(settingsForm.registrationPrice);
      await updateContactInfo(settingsForm.contactInfo);
      await updateSocialMediaLinks(settingsForm.socialMediaLinks);
      
      if (settingsForm.newPassword) {
        await updateAdminPassword(settingsForm.newPassword);
        setSettingsForm(prev => ({ ...prev, newPassword: '' }));
      }
      
      setEditingSettings(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-royal-blue mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <Crown className="w-12 h-12 text-royal-blue mx-auto mb-4" />
            <h1 className="text-2xl font-playfair font-bold text-gray-900">Admin Login</h1>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-royal-blue text-white py-3 rounded-lg font-inter font-semibold hover:bg-deep-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-royal-blue hover:text-deep-blue transition-colors font-inter text-sm"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'businesses', label: 'Businesses', icon: Building },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'programs', label: 'Programs', icon: Crown },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-royal-blue" />
              <div>
                <h1 className="text-xl font-playfair font-bold text-gray-900">
                  Kingdom Business Studio
                </h1>
                <p className="text-sm text-gray-600 font-inter">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 font-inter text-sm"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-inter font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-royal-blue text-royal-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg">
          {/* Businesses Tab */}
          {activeTab === 'businesses' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold text-gray-900">Businesses</h2>
                <button
                  onClick={() => setShowAddBusiness(true)}
                  className="bg-royal-blue text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-deep-blue transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Business</span>
                </button>
              </div>

              {showAddBusiness && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-playfair font-semibold mb-4">Add New Business</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={newBusiness.name}
                      onChange={(e) => setNewBusiness(prev => ({ ...prev, name: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Logo (emoji or URL)"
                      value={newBusiness.logo}
                      onChange={(e) => setNewBusiness(prev => ({ ...prev, logo: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newBusiness.category}
                      onChange={(e) => setNewBusiness(prev => ({ ...prev, category: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isNew"
                        checked={newBusiness.isNew}
                        onChange={(e) => setNewBusiness(prev => ({ ...prev, isNew: e.target.checked }))}
                        className="rounded border-gray-300 text-royal-blue focus:ring-royal-blue"
                      />
                      <label htmlFor="isNew" className="text-sm font-inter text-gray-700">Mark as New</label>
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newBusiness.description}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  />
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleAddBusiness}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setShowAddBusiness(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.map((business) => (
                  <div key={business.id} className="border border-gray-200 rounded-lg p-4">
                    {editingBusiness?.id === business.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingBusiness.name}
                          onChange={(e) => setEditingBusiness(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={editingBusiness.logo}
                          onChange={(e) => setEditingBusiness(prev => prev ? { ...prev, logo: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={editingBusiness.category}
                          onChange={(e) => setEditingBusiness(prev => prev ? { ...prev, category: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <textarea
                          value={editingBusiness.description}
                          onChange={(e) => setEditingBusiness(prev => prev ? { ...prev, description: e.target.value } : null)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={editingBusiness.isNew}
                            onChange={(e) => setEditingBusiness(prev => prev ? { ...prev, isNew: e.target.checked } : null)}
                            className="rounded border-gray-300 text-royal-blue focus:ring-royal-blue"
                          />
                          <label className="text-sm font-inter text-gray-700">Mark as New</label>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateBusiness}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingBusiness(null)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{business.logo}</span>
                            {business.isNew && (
                              <span className="bg-mustard-yellow text-white px-2 py-1 rounded-full text-xs font-inter font-medium">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setEditingBusiness(business)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeBusiness(business.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-playfair font-semibold text-gray-900">{business.name}</h3>
                        <p className="text-royal-blue font-inter text-sm">{business.category}</p>
                        <p className="text-gray-600 font-inter text-sm mt-2">{business.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Posts Tab */}
          {activeTab === 'blog' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold text-gray-900">Blog Posts</h2>
                <button
                  onClick={() => setShowAddBlogPost(true)}
                  className="bg-royal-blue text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-deep-blue transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Post</span>
                </button>
              </div>

              {showAddBlogPost && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-playfair font-semibold mb-4">Add New Blog Post</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Author"
                        value={newBlogPost.author}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, author: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={newBlogPost.date}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, date: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newBlogPost.category}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, category: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Image URL (optional)"
                      value={newBlogPost.imageUrl}
                      onChange={(e) => setNewBlogPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <textarea
                      placeholder="Excerpt"
                      value={newBlogPost.excerpt}
                      onChange={(e) => setNewBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <textarea
                      placeholder="Content"
                      value={newBlogPost.content}
                      onChange={(e) => setNewBlogPost(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleAddBlogPost}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setShowAddBlogPost(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    {editingBlogPost?.id === post.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editingBlogPost.title}
                            onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={editingBlogPost.author}
                            onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, author: e.target.value } : null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          />
                          <input
                            type="date"
                            value={editingBlogPost.date}
                            onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, date: e.target.value } : null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={editingBlogPost.category}
                            onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, category: e.target.value } : null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          />
                        </div>
                        <input
                          type="url"
                          value={editingBlogPost.imageUrl || ''}
                          onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, imageUrl: e.target.value } : null)}
                          placeholder="Image URL (optional)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <textarea
                          value={editingBlogPost.excerpt}
                          onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <textarea
                          value={editingBlogPost.content}
                          onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateBlogPost}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingBlogPost(null)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-playfair font-semibold text-gray-900">{post.title}</h3>
                            <p className="text-sm text-gray-600 font-inter">
                              By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.category}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setEditingBlogPost(post)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeBlogPost(post.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 font-inter text-sm">{post.excerpt}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <div className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Programs</h2>
              <div className="space-y-6">
                {programs.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    {editingProgram?.id === program.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingProgram.name}
                          onChange={(e) => setEditingProgram(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <textarea
                          value={editingProgram.description}
                          onChange={(e) => setEditingProgram(prev => prev ? { ...prev, description: e.target.value } : null)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <select
                            value={editingProgram.primaryColor}
                            onChange={(e) => setEditingProgram(prev => prev ? { ...prev, primaryColor: e.target.value } : null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          >
                            <option value="royal-blue">Royal Blue</option>
                            <option value="mustard-yellow">Mustard Yellow</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                            Features (one per line)
                          </label>
                          <textarea
                            value={editingProgram.features.join('\n')}
                            onChange={(e) => setEditingProgram(prev => prev ? { ...prev, features: e.target.value.split('\n').filter(f => f.trim()) } : null)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateProgram}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProgram(null)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-playfair font-semibold text-gray-900">{program.name}</h3>
                            <p className="text-sm text-gray-600 font-inter mt-2">{program.description}</p>
                          </div>
                          <button
                            onClick={() => setEditingProgram(program)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-inter font-medium text-gray-700 mb-2">Features:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {program.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 font-inter">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Registrations ({registrations.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Business
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((registration) => (
                      <tr key={registration.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-inter font-medium text-gray-900">
                              {registration.fullName}
                            </div>
                            <div className="text-sm text-gray-500 font-inter">
                              {registration.country}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-inter">
                            {registration.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-inter">
                            {registration.industry}
                          </div>
                          <div className="text-sm text-gray-500 font-inter">
                            {registration.businessIdea.substring(0, 50)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-inter">
                            {registration.paymentMethod}
                          </div>
                          <div className="text-sm text-gray-500 font-inter">
                            {registration.paymentProof}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-inter">
                          {new Date(registration.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => removeRegistration(registration.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold text-gray-900">Settings</h2>
                {editingSettings ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveSettings}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setEditingSettings(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingSettings(true)}
                    className="bg-royal-blue text-white px-4 py-2 rounded-lg font-inter font-medium hover:bg-deep-blue transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Settings</span>
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Registration Price */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="w-5 h-5 text-royal-blue" />
                    <h3 className="text-lg font-playfair font-semibold text-gray-900">Registration Price</h3>
                  </div>
                  {editingSettings ? (
                    <input
                      type="number"
                      value={settingsForm.registrationPrice}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, registrationPrice: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-700 font-inter">KES {registrationPrice}</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Phone className="w-5 h-5 text-royal-blue" />
                    <h3 className="text-lg font-playfair font-semibold text-gray-900">Contact Information</h3>
                  </div>
                  {editingSettings ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          value={settingsForm.contactInfo.phone}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, phone: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={settingsForm.contactInfo.email}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, email: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">WhatsApp</label>
                        <input
                          type="text"
                          value={settingsForm.contactInfo.whatsapp}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, whatsapp: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={settingsForm.contactInfo.location}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, location: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Phone</p>
                        <p className="text-gray-600 font-inter">{contactInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Email</p>
                        <p className="text-gray-600 font-inter">{contactInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">WhatsApp</p>
                        <p className="text-gray-600 font-inter">{contactInfo.whatsapp}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Location</p>
                        <p className="text-gray-600 font-inter">{contactInfo.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Facebook className="w-5 h-5 text-royal-blue" />
                    <h3 className="text-lg font-playfair font-semibold text-gray-900">Social Media Links</h3>
                  </div>
                  {editingSettings ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Facebook</label>
                        <input
                          type="url"
                          value={settingsForm.socialMediaLinks.facebook}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            socialMediaLinks: { ...prev.socialMediaLinks, facebook: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Instagram</label>
                        <input
                          type="url"
                          value={settingsForm.socialMediaLinks.instagram}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            socialMediaLinks: { ...prev.socialMediaLinks, instagram: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                          type="url"
                          value={settingsForm.socialMediaLinks.twitter}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            socialMediaLinks: { ...prev.socialMediaLinks, twitter: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                          type="url"
                          value={settingsForm.socialMediaLinks.linkedin}
                          onChange={(e) => setSettingsForm(prev => ({
                            ...prev,
                            socialMediaLinks: { ...prev.socialMediaLinks, linkedin: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Facebook</p>
                        <p className="text-gray-600 font-inter break-all">{socialMediaLinks.facebook}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Instagram</p>
                        <p className="text-gray-600 font-inter break-all">{socialMediaLinks.instagram}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">Twitter</p>
                        <p className="text-gray-600 font-inter break-all">{socialMediaLinks.twitter}</p>
                      </div>
                      <div>
                        <p className="text-sm font-inter font-medium text-gray-700">LinkedIn</p>
                        <p className="text-gray-600 font-inter break-all">{socialMediaLinks.linkedin}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Admin Password */}
                {editingSettings && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Settings className="w-5 h-5 text-royal-blue" />
                      <h3 className="text-lg font-playfair font-semibold text-gray-900">Change Admin Password</h3>
                    </div>
                    <div className="max-w-md">
                      <label className="block text-sm font-inter font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        value={settingsForm.newPassword}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Leave blank to keep current password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;