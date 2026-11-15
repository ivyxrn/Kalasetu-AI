import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordForm({ onSwitchToSignIn }) {
  const { t } = useLanguage();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const validate = () => {
    if (!email.trim()) {
      setError(t('auth.errors.required', 'This field is required'));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t('auth.errors.invalidEmail', 'Please enter a valid email address'));
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      const res = await forgotPassword(email.trim());
      if (res.success) {
        setSentEmail(email.trim());
        setSubmitted(true);
      } else {
        setError(res.error || t('auth.errors.somethingWentWrong', 'Something went wrong. Please try again.'));
      }
    } catch (err) {
      setError(t('auth.errors.somethingWentWrong', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-forest mb-4 shadow-sm">
            <CheckCircle2 size={28} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-forest/10 text-forest border border-forest/20 mb-2">
            {t('auth.forgot.tag', 'Password Recovery')}
          </span>
          <h2 className="font-serif text-2xl font-bold text-brown">
            {t('auth.forgot.successTitle', 'Reset Link Sent (Demo Mode)')}
          </h2>
          <p className="font-sans text-xs text-brown/65 mt-2 leading-relaxed">
            {t('auth.forgot.successDescription', 'In a production environment connected to Supabase/PostgreSQL, a tokenized password recovery email will be delivered to:')}
          </p>
          <div className="mt-3 px-4 py-2.5 rounded-xl bg-beige border border-beige-dark/60 inline-flex items-center gap-2 text-brown font-mono text-xs font-semibold">
            <Mail size={14} className="text-terracotta" />
            {sentEmail}
          </div>
          <div className="mt-4 p-3.5 rounded-xl bg-ochre/10 border border-ochre/25 text-left">
            <p className="font-sans text-[11.5px] text-brown/75 leading-relaxed">
              💡 {t('auth.forgot.successInstruction', 'For this demonstration, you can return to the sign in page and log in directly using the one-click demo artisan account.')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="w-full py-3 px-4 rounded-xl font-serif text-sm font-semibold text-ivory bg-terracotta hover:bg-terracotta-dark transition-all duration-200 shadow-warm flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          {t('auth.forgot.returnButton', 'Return to Sign In')}
        </button>

        <div className="text-center pt-2">
          <span className="font-sans text-xs text-brown/55">
            {t('auth.forgot.resendPrompt', "Didn't receive an email?")}{' '}
          </span>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="font-sans text-xs font-semibold text-terracotta hover:underline"
          >
            {t('auth.forgot.resendAction', 'Try sending again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="inline-flex items-center gap-1.5 text-xs font-sans text-brown/60 hover:text-terracotta transition-colors mb-3 group"
        >
          <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
          {t('auth.forgot.backToSignIn', 'Return to Sign In')}
        </button>
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-serif tracking-wider uppercase bg-ochre/15 text-ochre-dark border border-ochre/30 mb-2">
          {t('auth.forgot.tag', 'Password Recovery')}
        </span>
        <h2 className="font-serif text-2xl font-bold text-brown">
          {t('auth.forgot.title', 'Reset your password')}
        </h2>
        <p className="font-sans text-xs text-brown/60 mt-1 leading-relaxed">
          {t('auth.forgot.subtitle', 'Enter the email associated with your KalaSetu account and we will send you a reset link.')}
        </p>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/25 flex items-start gap-2 text-terracotta text-xs">
          <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-sans text-xs font-semibold text-brown/80 mb-1.5">
            {t('auth.forgot.emailLabel', 'Email Address')} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder={t('auth.forgot.emailPlaceholder', 'artisan@kalasetu.ai')}
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-sans bg-beige/40 text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-terracotta/25 transition-all ${
                error ? 'border-terracotta bg-terracotta/5' : 'border-beige-dark/70 hover:border-ochre/60 focus:border-terracotta'
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl font-serif text-sm font-semibold text-ivory bg-terracotta hover:bg-terracotta-dark transition-all duration-200 shadow-warm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
              <span>{t('auth.forgot.submittingButton', 'Sending Reset Link...')}</span>
            </>
          ) : (
            <>
              <KeyRound size={15} />
              <span>{t('auth.forgot.submitButton', 'Send Reset Link')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
