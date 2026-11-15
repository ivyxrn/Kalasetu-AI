import React from 'react';
import { inspirationQuote } from '../../data/sampleData';
import { useLanguage } from '../../i18n';

export default function InspirationQuote() {
  const { t } = useLanguage();
  return (
    <div className="relative mt-4 mb-3 pt-4 border-t border-beige-dark/40">
      <div className="text-center px-6">
        <p className="font-serif italic text-brown/60 text-[13.5px] leading-relaxed max-w-xl mx-auto">
          &ldquo;{t('dashboard.quote', inspirationQuote.text)}&rdquo;
        </p>
        <p className="font-sans text-brown/40 text-[10.5px] mt-1.5 tracking-wider uppercase">
          — {t('dashboard.quoteAuthor', inspirationQuote.author)}
        </p>
      </div>
    </div>
  );
}
