import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, Check, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { RegistrationForm } from '../types';

const Register: React.FC = () => {
  const { addRegistration, registrationPrice } = useAdmin();
  const [formData, setFormData] = useState<RegistrationForm>({
    fullName: '',
    phoneNumber: '',
    country: '',
    industry: '',
    businessIdea: '',
    openToCollaboration: 'yes',
    bornAgain: 'yes',
    available8Weeks: 'yes',
    timePreference: 'morning',
    daysPreference: [],
    paymentMethod: '',
    paymentProof: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationForm>>({});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      daysPreference: prev.daysPreference.includes(day)
        ? prev.daysPreference.filter(d => d !== day)
        : [...prev.daysPreference, day]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationForm> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.businessIdea.trim()) newErrors.businessIdea = 'Business idea is required';
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.paymentProof.trim()) newErrors.paymentProof = 'Payment proof is required';
    if (formData.daysPreference.length === 0) {
      newErrors.daysPreference = ['At least one day must be selected'] as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addRegistration(formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-ivory py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                Registration Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-6 font-inter">
                Thank you for registering with Kingdom Business Studio. We'll contact you soon with further details about your program.
              </p>
              <div className="bg-royal-blue/10 border border-royal-blue/20 rounded-lg p-4 mb-6">
                <p className="text-royal-blue font-inter">
                  <strong>Program Cost:</strong> KES {registrationPrice} (~${Math.round(registrationPrice / 130)} USD)<br />
                  <small>1 USD ~ 130 KES (subject to market changes)</small>
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center bg-royal-blue text-white px-6 py-3 rounded-full font-inter font-semibold hover:bg-deep-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-royal-blue hover:text-deep-blue transition-colors font-inter font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="bg-royal-blue text-white p-6 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-mustard-yellow" />
                <div>
                  <h1 className="text-2xl font-playfair font-bold">Program Registration</h1>
                  <p className="text-royal-blue/70 font-inter">Join the Kingdom Business Studio family</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+254 700 123 456"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your country"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Technology, Healthcare, Education"
                  />
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.industry}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Idea */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Business Idea *
                </label>
                <textarea
                  name="businessIdea"
                  value={formData.businessIdea}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                    errors.businessIdea ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your business idea or current business"
                />
                {errors.businessIdea && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.businessIdea}
                  </p>
                )}
              </div>

              {/* Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Are you open to collaboration with others?
                  </label>
                  <select
                    name="openToCollaboration"
                    value={formData.openToCollaboration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Are you born again (submitted to Jesus Christ as Lord and Saviour)?
                  </label>
                  <select
                    name="bornAgain"
                    value={formData.bornAgain}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  >
                    <option value="yes">Yes</option>
                    <option value="not-sure">I'm not sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Are you available for 8 weeks, twice weekly, 2–3 hour sessions?
                  </label>
                  <select
                    name="available8Weeks"
                    value={formData.available8Weeks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  >
                    <option value="yes">Yes</option>
                    <option value="heavy">That's heavy for me</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    What time works best?
                  </label>
                  <select
                    name="timePreference"
                    value={formData.timePreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  >
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>

              {/* Days Preference */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Which days work best for you? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        formData.daysPreference.includes(day)
                          ? 'bg-royal-blue text-white border-royal-blue'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-royal-blue'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.daysPreference && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    At least one day must be selected
                  </p>
                )}
              </div>

              {/* Payment Information */}
              <div className="bg-royal-blue/5 border border-royal-blue/20 rounded-lg p-4">
                <h3 className="text-lg font-playfair font-semibold text-royal-blue mb-2">
                  Payment Information
                </h3>
                <p className="text-royal-blue mb-4 font-inter">
                  <strong>Program Cost:</strong> KES {registrationPrice} (~${Math.round(registrationPrice / 130)} USD)<br />
                  <small>1 USD ~ 130 KES (subject to market changes)</small>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Payment Method *
                    </label>
                    <input
                      type="text"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                        errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., M-Pesa, Bank Transfer, etc."
                    />
                    {errors.paymentMethod && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.paymentMethod}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Payment Proof *
                    </label>
                    <input
                      type="text"
                      name="paymentProof"
                      value={formData.paymentProof}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent ${
                        errors.paymentProof ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Transaction ID or description"
                    />
                    {errors.paymentProof && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.paymentProof}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-royal-blue text-white px-8 py-4 rounded-full font-inter font-semibold hover:bg-deep-blue transition-colors shadow-lg hover:shadow-xl"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;