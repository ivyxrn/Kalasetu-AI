import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';
import { useAuth, DEFAULT_DEMO_USER } from '../../context/AuthContext';
import { useLanguage } from '../../i18n';

export default function SignInForm({ onSwitchMode }) {
  const { t } = useLanguage();
  const { login, demoLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = t('auth.errors.emailRequired', 'Please enter your email address.');
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = t('auth.errors.emailInvalid', 'Please enter a valid email address.');
    }

    if (!password) {
      newErrors.password = t('auth.errors.passwordRequired', 'Please enter your password.');
    } else if (password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort', 'Password must be at least 6 characters long.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validate()) return;

    try {
      const res = await login(email, password, rememberMe);
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      setGeneralError(t('auth.errors.invalidCredentials', 'The email or password you entered is incorrect.'));
    }
  };

  const handleQuickDemo = async () => {
    setEmail(DEFAULT_DEMO_USER.email);
    setPassword('kalasetu2026');
    setErrors({});
    setGeneralError('');

    const res = await demoLogin();
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Subtitle */}
      <div>
        <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl tracking-tight">
          {t('auth.signInHeading', 'Welcome Back')}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1.5 leading-relaxed">
          {t('auth.signInSubtitle', "We're glad to have you here.")}
        </p>
      </div>

      {/* Quick Demo Login Pill */}
      <div className="p-3 rounded-2xl bg-ochre/15 border border-ochre/35 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-brown truncate">
            <Sparkles size={13} className="text-terracotta flex-shrink-0" />
            <span className="truncate">{DEFAULT_DEMO_USER.name} (Demo Artisan)</span>
          </div>
          <p className="text-[11px] font-sans text-brown/60 truncate mt-0.5">
            {DEFAULT_DEMO_USER.email}
          </p>
        </div>
        <button
          type="button"
          onClick={handleQuickDemo}
          disabled={loading}
          className="btn-primary text-xs py-1.5 px-3 whitespace-nowrap flex-shrink-0 shadow-xs"
        >
          {loading ? t('auth.signingIn', 'Signing In...') : t('auth.quickDemoButton', 'Quick Sign-In')}
        </button>
      </div>

      {/* General error message */}
      {generalError && (
        <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 flex items-center gap-2 text-xs font-sans text-terracotta">
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
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

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('auth.passwordLabel', 'Password')} <span className="text-terracotta">*</span>
            </label>
            <button
              type="button"
              onClick={() => onSwitchMode ? onSwitchMode('forgot') : navigate('/forgot-password')}
              className="text-xs font-sans font-medium text-terracotta hover:underline"
            >
              {t('auth.forgotPasswordLink', 'Forgot Password?')}
            </button>
          </div>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
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
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
              <AlertCircle size={11} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-terracotta border-beige-dark/80 focus:ring-terracotta/30 accent-terracotta"
            />
            <span className="text-xs font-sans text-brown/75">
              {t('auth.rememberMe', 'Remember Me')}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <span>{loading ? t('auth.signingIn', 'Signing In...') : t('auth.signInButton', 'Sign In')}</span>
          <ArrowRight size={15} />
        </button>
      </form>

      {/* Switch to Sign Up */}
      <div className="pt-4 border-t border-beige-dark/40 text-center">
        <p className="text-xs font-sans text-brown/70">
          {t('auth.noAccountPrompt', "Don't have an account?")}{' '}
          <button
            type="button"
            onClick={() => onSwitchMode ? onSwitchMode('signup') : navigate('/register')}
            className="font-semibold text-terracotta hover:underline ml-1"
          >
            {t('auth.createAccountLink', 'Create an Account')}
          </button>
        </p>
      </div>
    </div>
  );
}
