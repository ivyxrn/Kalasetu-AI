import React from 'react';
import { Plus } from 'lucide-react';
import { BotanicalSprig, HeaderPeacock } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function ArtworkHeader({ onOpenUpload }) {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6 pb-2">
      {/* Background Decorative Peacock – positioned subtly to the right of the text, before the button */}
      <div className="absolute right-52 -top-2 w-56 h-28 pointer-events-none select-none hidden lg:block opacity-65">
        <HeaderPeacock className="w-full h-full" />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title and Subtitle */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-brown text-2xl sm:text-3xl tracking-tight leading-none">
              {t('artwork.title', 'My Artwork')}
            </h1>
            <BotanicalSprig className="w-6 h-6 flex-shrink-0" />
          </div>
          <p className="font-sans text-brown/55 text-sm sm:text-[15px] mt-1.5 leading-relaxed">
            {t('artwork.subtitle', 'Every creation has a story. Manage and showcase yours.')}
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex-shrink-0 z-10">
          <button
            onClick={onOpenUpload}
            className="btn-primary shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus size={16} strokeWidth={2.4} />
            {t('artwork.uploadNew', 'Upload New Artwork')}
          </button>
        </div>
      </div>
    </div>
  );
}

