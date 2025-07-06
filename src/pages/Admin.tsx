import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Crown, LogOut, Plus, Trash2, Users, BookOpen, Building, Eye, X, Edit, Save, DollarSign, Settings, ArrowLeft, Upload, EyeOff, Share2 } from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    isAuthenticated, 
    login, 
    logout, 
    businesses, 
    blogPosts,
    programs,
    registrationPrice,
    contactInfo,
    socialMediaLinks,
    addBusiness, 
    removeBusiness,
    updateBusiness,
    addBlogPost, 
    removeBlogPost,
    updateBlogPost,
    updateProgram,
    getRegistrations,
    updateRegistrationPrice,
    updateContactInfo,
    updateSocialMediaLinks,
    updateAdminPassword,
    removeRegistration
  } = useAdmin();
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'businesses' | 'blog' | 'programs' | 'registrations' | 'settings'>('businesses');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRegistrationDetail, setShowRegistrationDetail] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const [newBusiness, setNewBusiness] = useState({
    name: '',
    logo: '',
    category: '',
    description: '',
    isNew: false,
  });

  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    imageUrl: '',
  });

  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [newPrice, setNewPrice] = useState(registrationPrice);
  const [newContactInfo, setNewContactInfo] = useState(contactInfo);
  const [newSocialMedia, setNewSocialMedia] = useState(socialMediaLinks);
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginForm.username, loginForm.password)) {
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'business' | 'blog') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (type === 'business') {
          setNewBusiness(prev => ({ ...prev, logo: result }));
        } else {
          setNewBlogPost(prev => ({ ...prev, imageUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    addBusiness(newBusiness);
    setNewBusiness({ name: '', logo: '', category: '', description: '', isNew: false });
    setShowAddForm(false);
  };

  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost(newBlogPost);
    setNewBlogPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      imageUrl: '',
    });
    setShowAddForm(false);
  };

  const handleUpdateProgram = (programId: string) => {
    if (editingProgram) {
      updateProgram(programId, editingProgram);
      setEditingProgram(null);
      setEditingItem(null);
    }
  };

  const handleUpdatePrice = () => {
    updateRegistrationPrice(newPrice);
    alert('Registration price updated successfully!');
  };

  const handleUpdateContactInfo = () => {
    updateContactInfo(newContactInfo);
    alert('Contact information updated successfully!');
  };

  const handleUpdateSocialMedia = () => {
    updateSocialMediaLinks(newSocialMedia);
    alert('Social media links updated successfully!');
  };

  const handleUpdatePassword = () => {
    if (newPassword.trim()) {
      updateAdminPassword(newPassword);
      setNewPassword('');
      alert('Password updated successfully!');
    }
  };

  const handleDeleteRegistration = (registrationId: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      removeRegistration(registrationId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-royal-blue hover:text-deep-blue transition-colors font-inter font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center mb-6">
            <Crown className="w-12 h-12 text-royal-blue mx-auto mb-4" />
            <h1 className="text-2xl font-playfair font-bold text-gray-900">Admin Login</h1>
          </div>
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
                  type={showPassword ? "text" : "password"}
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
              className="w-full bg-royal-blue text-white py-3 rounded-lg font-inter font-semibold hover:bg-deep-blue transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const registrations = getRegistrations();

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-royal-blue" />
              <h1 className="text-2xl font-playfair font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-royal-blue transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-inter">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600">Total Businesses</p>
                <p className="text-2xl font-playfair font-bold text-gray-900">{businesses.length}</p>
              </div>
              <Building className="w-8 h-8 text-royal-blue" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600">Blog Posts</p>
                <p className="text-2xl font-playfair font-bold text-gray-900">{blogPosts.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-mustard-yellow" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600">Registrations</p>
                <p className="text-2xl font-playfair font-bold text-gray-900">{registrations.length}</p>
              </div>
              <Users className="w-8 h-8 text-royal-blue" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600">Registration Price</p>
                <p className="text-2xl font-playfair font-bold text-gray-900">KES {registrationPrice}</p>
              </div>
              <DollarSign className="w-8 h-8 text-mustard-yellow" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'businesses', label: 'Businesses', icon: Building },
              { id: 'blog', label: 'Blog Posts', icon: BookOpen },
              { id: 'programs', label: 'Programs', icon: Settings },
              { id: 'registrations', label: 'Registrations', icon: Users },
              { id: 'settings', label: 'Settings', icon: DollarSign },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-inter font-medium whitespace-nowrap ${
                  activeTab === id
                    ? 'text-royal-blue border-b-2 border-royal-blue'
                    : 'text-gray-600 hover:text-royal-blue'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'businesses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-playfair font-bold text-gray-900">Manage Businesses</h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-inter">Add Business</span>
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddBusiness} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Business Name"
                        value={newBusiness.name}
                        onChange={(e) => setNewBusiness(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            placeholder="Logo (emoji or text)"
                            value={newBusiness.logo}
                            onChange={(e) => setNewBusiness(prev => ({ ...prev, logo: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <label className="flex items-center space-x-1 bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'business')}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {newBusiness.logo && newBusiness.logo.startsWith('data:') && (
                          <img src={newBusiness.logo} alt="Logo preview" className="w-12 h-12 object-cover rounded" />
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Category"
                        value={newBusiness.category}
                        onChange={(e) => setNewBusiness(prev => ({ ...prev, category: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isNew"
                          checked={newBusiness.isNew}
                          onChange={(e) => setNewBusiness(prev => ({ ...prev, isNew: e.target.checked }))}
                          className="rounded"
                        />
                        <label htmlFor="isNew" className="text-sm font-inter">Mark as New</label>
                      </div>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={newBusiness.description}
                      onChange={(e) => setNewBusiness(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                      rows={3}
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                      >
                        Add Business
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {businesses.map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded border">
                          {business.logo.startsWith('data:') ? (
                            <img src={business.logo} alt={business.name} className="w-10 h-10 object-cover rounded" />
                          ) : (
                            <span className="text-2xl">{business.logo}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-inter font-semibold text-gray-900">{business.name}</h3>
                          <p className="text-sm text-gray-600">{business.category}</p>
                        </div>
                        {business.isNew && (
                          <span className="bg-mustard-yellow text-white px-2 py-1 rounded-full text-xs">
                            New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeBusiness(business.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-playfair font-bold text-gray-900">Manage Blog Posts</h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-inter">Add Post</span>
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddBlogPost} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Post Title"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Author"
                        value={newBlogPost.author}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, author: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newBlogPost.category}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, category: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="date"
                        value={newBlogPost.date}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, date: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="url"
                          placeholder="Image URL (e.g., https://images.pexels.com/...)"
                          value={newBlogPost.imageUrl}
                          onChange={(e) => setNewBlogPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <label className="flex items-center space-x-1 bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'blog')}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {newBlogPost.imageUrl && (
                        <img src={newBlogPost.imageUrl} alt="Preview" className="w-32 h-20 object-cover rounded" />
                      )}
                    </div>
                    <textarea
                      placeholder="Excerpt"
                      value={newBlogPost.excerpt}
                      onChange={(e) => setNewBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                      rows={3}
                      required
                    />
                    <textarea
                      placeholder="Content"
                      value={newBlogPost.content}
                      onChange={(e) => setNewBlogPost(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                      rows={6}
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                      >
                        Add Post
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt={post.title} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h3 className="font-inter font-semibold text-gray-900">{post.title}</h3>
                          <p className="text-sm text-gray-600">{post.category} • {post.author}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBlogPost(post.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                  Manage Programs
                </h2>
                <div className="space-y-6">
                  {programs.map((program) => (
                    <div key={program.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-playfair font-semibold text-gray-900">{program.name}</h3>
                        <button
                          onClick={() => {
                            if (editingItem === program.id) {
                              handleUpdateProgram(program.id);
                            } else {
                              setEditingItem(program.id);
                              setEditingProgram(program);
                            }
                          }}
                          className="flex items-center space-x-2 bg-royal-blue text-white px-3 py-1 rounded-lg hover:bg-deep-blue transition-colors"
                        >
                          {editingItem === program.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                          <span className="text-sm">{editingItem === program.id ? 'Save' : 'Edit'}</span>
                        </button>
                      </div>
                      
                      {editingItem === program.id ? (
                        <div className="space-y-4">
                          <textarea
                            value={editingProgram?.description || ''}
                            onChange={(e) => setEditingProgram(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows={4}
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                            <textarea
                              value={editingProgram?.features?.join('\n') || ''}
                              onChange={(e) => setEditingProgram(prev => ({ ...prev, features: e.target.value.split('\n').filter(f => f.trim()) }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              rows={6}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-4">{program.description}</p>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {program.features.map((feature, index) => (
                                <li key={index} className="text-gray-600">{feature}</li>
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

            {activeTab === 'registrations' && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                  Program Registrations
                </h2>
                {registrations.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-inter">No registrations yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((registration) => (
                      <div key={registration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-inter font-semibold text-gray-900">{registration.fullName}</h3>
                          <p className="text-sm text-gray-600">{registration.industry} • {registration.country}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(registration.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowRegistrationDetail(registration)}
                            className="text-royal-blue hover:text-deep-blue transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRegistration(registration.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                  Settings
                </h2>
                
                {/* Registration Price */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                    Registration Price
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price in KES
                      </label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="3000"
                      />
                    </div>
                    <button
                      onClick={handleUpdatePrice}
                      className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                    >
                      Update Price
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Current price: KES {registrationPrice} (~${Math.round(registrationPrice / 130)} USD)
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={newContactInfo.phone}
                        onChange={(e) => setNewContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="+254 700 123 456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={newContactInfo.email}
                        onChange={(e) => setNewContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="info@kingdombusinessstudio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={newContactInfo.whatsapp}
                        onChange={(e) => setNewContactInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="+254700123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newContactInfo.location}
                        onChange={(e) => setNewContactInfo(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Nairobi, Kenya"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateContactInfo}
                    className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                  >
                    Update Contact Info
                  </button>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Social Media Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        value={newSocialMedia.facebook}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, facebook: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://facebook.com/kingdombusinessstudio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={newSocialMedia.instagram}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, instagram: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://instagram.com/kingdombusinessstudio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter/X URL
                      </label>
                      <input
                        type="url"
                        value={newSocialMedia.twitter}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, twitter: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://twitter.com/kingdombusiness"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={newSocialMedia.linkedin}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, linkedin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="https://linkedin.com/company/kingdom-business-studio"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateSocialMedia}
                    className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                  >
                    Update Social Media Links
                  </button>
                </div>

                {/* Admin Password */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                    Change Admin Password
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter new password"
                      />
                    </div>
                    <button
                      onClick={handleUpdatePassword}
                      className="bg-royal-blue text-white px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Google Sheets Integration */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
                    Google Sheets Integration
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Registration data is automatically logged to the console for Google Sheets integration.
                  </p>
                  <p className="text-sm text-gray-500">
                    Spreadsheet URL: https://docs.google.com/spreadsheets/d/1ibyfnjysQazSozfkMQkjuic-wzIaO3zv2mhMqser1Ow/edit
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Detail Modal */}
      {showRegistrationDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-playfair font-bold text-gray-900">
                Registration Details
              </h2>
              <button
                onClick={() => setShowRegistrationDetail(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">{showRegistrationDetail.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{showRegistrationDetail.phoneNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Country</label>
                  <p className="text-gray-900">{showRegistrationDetail.country}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Industry</label>
                  <p className="text-gray-900">{showRegistrationDetail.industry}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700">Business Idea</label>
                <p className="text-gray-900 mt-1">{showRegistrationDetail.businessIdea}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Open to Collaboration</label>
                  <p className="text-gray-900">{showRegistrationDetail.openToCollaboration}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Born Again</label>
                  <p className="text-gray-900">{showRegistrationDetail.bornAgain}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Available 8 Weeks</label>
                  <p className="text-gray-900">{showRegistrationDetail.available8Weeks}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Time Preference</label>
                  <p className="text-gray-900">{showRegistrationDetail.timePreference}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700">Preferred Days</label>
                <p className="text-gray-900">{showRegistrationDetail.daysPreference.join(', ')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Payment Method</label>
                  <p className="text-gray-900">{showRegistrationDetail.paymentMethod}</p>
                </div>
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700">Payment Proof</label>
                  <p className="text-gray-900">{showRegistrationDetail.paymentProof}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700">Registration Date</label>
                <p className="text-gray-900">{new Date(showRegistrationDetail.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;