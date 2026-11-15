import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, MapPin, ArrowRight, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n';

export default function SignUpForm({ onSwitchMode }) {
  const { t, language } = useLanguage();
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('auth.errors.nameRequired', 'Please enter your full name.');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('auth.errors.emailRequired', 'Please enter your email address.');
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = t('auth.errors.emailInvalid', 'Please enter a valid email address.');
    }

    if (!formData.password) {
      newErrors.password = t('auth.errors.passwordRequired', 'Please enter your password.');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort', 'Password must be at least 6 characters long.');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired', 'Please confirm your password.');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordsDoNotMatch', 'Passwords do not match.');
    }

    if (!agreedTerms) {
      newErrors.terms = t('auth.errors.termsRequired', 'Please accept the Terms and Privacy Policy to create your account.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validate()) return;

    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Subtitle */}
      <div>
        <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl tracking-tight">
          {t('auth.signUpHeading', 'Join KalaSetu AI')}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1.5 leading-relaxed">
          {t('auth.signUpSubtitle', "Your journey starts here. Let's bring your craft to the world.")}
        </p>
      </div>

      {/* General Error */}
      {generalError && (
        <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 flex items-center gap-2 text-xs font-sans text-terracotta">
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('auth.fullNameLabel', 'Full Name')} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('auth.fullNamePlaceholder', 'e.g. Ivy Maiti')}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-beige-light border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.name
                  ? 'border-terracotta focus:border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta/30'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
              <AlertCircle size={11} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('auth.emailLabel', 'Email Address')} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth.emailPlaceholder', 'e.g. ivy.maiti.crafts@gmail.com')}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-beige-light border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.email
                  ? 'border-terracotta focus:border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta/30'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
              <AlertCircle size={11} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Village / Town (Optional) */}
        <div className="space-y-1">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('auth.locationLabel', 'Village, Town or City (Optional)')}
          </label>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t('auth.locationPlaceholder', 'e.g. Bankura, West Bengal')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-beige-light border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('auth.passwordLabel', 'Password')} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-beige-light border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.password
                  ? 'border-terracotta focus:border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta/30'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown p-1"
              title={showPassword ? t('auth.hidePassword', 'Hide password') : t('auth.showPassword', 'Show password')}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
              <AlertCircle size={11} />
              <span>{errors.password}</span>
            </p>
          ) : (
            <p className="text-[10.5px] font-sans text-brown/50 mt-1">
              {t('auth.passwordHelp', 'At least 6 characters with letters or numbers')}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('auth.confirmPasswordLabel', 'Confirm Password')} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('auth.confirmPasswordPlaceholder', 'Re-enter your password')}
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-beige-light border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.confirmPassword
                  ? 'border-terracotta focus:border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta/30'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown p-1"
              title={showConfirmPassword ? t('auth.hidePassword', 'Hide password') : t('auth.showPassword', 'Show password')}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
              <AlertCircle size={11} />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => {
                setAgreedTerms(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: null }));
              }}
              className="w-4 h-4 mt-0.5 rounded text-terracotta border-beige-dark/80 focus:ring-terracotta/30 accent-terracotta"
            />
            <span className="text-xs font-sans text-brown/75 leading-relaxed">
              {t('auth.agreeTerms', 'I agree to the')}{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-terracotta font-medium hover:underline inline"
              >
                {t('auth.termsLink', 'Terms of Service')}
              </button>{' '}
              {t('auth.andText', 'and')}{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-terracotta font-medium hover:underline inline"
              >
                {t('auth.privacyLink', 'Privacy Policy')}
              </button>
            </span>
          </label>
          {errors.terms && (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1 ml-6">
              <AlertCircle size={11} />
              <span>{errors.terms}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <span>{loading ? t('auth.creatingAccount', 'Creating Account...') : t('auth.createAccountButton', 'Create Account')}</span>
          <ArrowRight size={15} />
        </button>
      </form>

      {/* Switch to Sign In */}
      <div className="pt-4 border-t border-beige-dark/40 text-center">
        <p className="text-xs font-sans text-brown/70">
          {t('auth.haveAccountPrompt', 'Already have an account?')}{' '}
          <button
            type="button"
            onClick={() => onSwitchMode ? onSwitchMode('signin') : navigate('/login')}
            className="font-semibold text-terracotta hover:underline ml-1"
          >
            {t('auth.signInLink', 'Sign In')}
          </button>
        </p>
      </div>

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-beige-dark/50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-forest" />
                <h3 className="font-serif font-bold text-brown text-lg">
                  {t('auth.termsModalTitle', 'KalaSetu AI Terms & Privacy Promise')}
                </h3>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 rounded-lg hover:bg-beige text-brown/60 hover:text-brown"
              >
                <X size={18} />
              </button>
            </div>

            <p className="font-serif text-sm text-brown/85 leading-relaxed">
              {t(
                'auth.termsModalP1',
                'KalaSetu AI exists to serve traditional and independent artisans across India. You retain 100% intellectual property ownership of your artwork, stories, and cultural heritage.'
              )}
            </p>

            <p className="font-sans text-xs text-brown/75 leading-relaxed bg-beige/40 p-3.5 rounded-xl border border-beige-dark/40">
              {t(
                'auth.termsModalP2',
                'We do not sell your personal data or artwork images. All records are stored securely with respectful privacy standards.'
              )}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="btn-primary text-xs py-2 px-5"
              >
                {t('auth.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
