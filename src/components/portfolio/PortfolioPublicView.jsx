import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Heart,
  Feather,
  Palette,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { LotusLogo, WarliDivider } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PortfolioPublicView({
  portfolio,
  artworks,
  onOpenInquiry,
  onOpenEdit,
}) {
  const { language, t } = useLanguage();

  // Filter featured artworks
  const featuredArtworks = artworks.filter((art) =>
    (portfolio.featuredArtworkIds || []).includes(art.id)
  );

  const displayArtworks =
    featuredArtworks.length > 0 ? featuredArtworks : artworks.slice(0, 4);

  return (
    <div
      id="public-portfolio-view"
      className="space-y-12 animate-fade-in scroll-mt-6"
    >
      {/* ── 1. ARTISAN HERO INTRODUCTION CARD ── */}
      <div className="relative rounded-3xl overflow-hidden bg-ivory border-2 border-beige-dark/70 shadow-lg p-6 sm:p-10">
        {/* Soft decorative background radiance */}
        <div
          className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(circle, #9D4935 0%, rgba(247, 243, 234, 0) 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Artisan Portrait Avatar with Lotus Aura */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-br from-ochre/40 via-terracotta/30 to-beige border-2 border-ochre/50 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-beige border-2 border-ivory flex items-center justify-center shadow-inner">
                  {/* Traditional Artisan Portrait Illustration */}
                  <img
                    src="/artworks/madhubani_harmony.jpg"
                    alt={portfolio.artisanName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Verified Traditional Artisan Seal */}
              <div
                className="absolute -bottom-2 right-2 px-2.5 py-1 rounded-full bg-forest text-white text-[10px] font-sans font-semibold flex items-center gap-1 shadow-md border-2 border-ivory"
                title="Verified Traditional Folk Artisan"
              >
                <ShieldCheck size={12} />
                <span>{language === 'hi' ? 'सत्यापित पारंपरिक शिल्पकार' : 'Traditional Artisan'}</span>
              </div>
            </div>

            {portfolio.isAvailableForOrders && (
              <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 border border-forest/25 text-forest text-xs font-sans font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                {t('portfolio.availableForOrders')}
              </span>
            )}
          </div>

          {/* Artisan Title & Bio Overview */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xs font-sans font-semibold text-terracotta uppercase tracking-wider">
                {portfolio.craftTitle}
              </span>
              <span className="text-brown/40 hidden sm:inline">·</span>
              <span className="text-xs font-sans text-brown/65 flex items-center gap-1">
                <MapPin size={12} className="text-terracotta" />
                {portfolio.location}
              </span>
            </div>

            <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
              {portfolio.artisanName}
            </h1>

            {/* Personal Statement Quote */}
            {portfolio.personalQuote && (
              <div className="p-4 rounded-2xl bg-beige/50 border border-ochre/30 mb-5 max-w-2xl">
                <p className="font-serif italic text-brown text-sm sm:text-base leading-relaxed">
                  &ldquo;{portfolio.personalQuote}&rdquo;
                </p>
              </div>
            )}

            {/* Craft Tradition Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
              {portfolio.primaryCrafts.map((craft) => (
                <span
                  key={craft}
                  className="px-3 py-1 rounded-full text-xs font-sans font-medium bg-ivory border border-beige-dark/70 text-brown shadow-sm"
                >
                  {craft}
                </span>
              ))}
            </div>

            {/* Direct Contact & Inquiry Action Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {portfolio.whatsappNumber && (
                <a
                  href={`https://wa.me/${portfolio.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Namaste ${portfolio.artisanName}! I saw your artwork portfolio on KalaSetu and would love to know more about your creations.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-sans font-medium shadow-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle size={15} />
                  <span>Message on WhatsApp</span>
                </a>
              )}

              {portfolio.contactNumber && (
                <a
                  href={`tel:${portfolio.contactNumber}`}
                  className="px-4 py-2.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown shadow-sm transition-colors flex items-center gap-2"
                >
                  <Phone size={14} className="text-terracotta" />
                  <span>Call Artisan</span>
                </a>
              )}

              <button
                onClick={() => onOpenInquiry()}
                className="px-4 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-sans font-medium shadow-sm transition-colors flex items-center gap-2"
              >
                <Send size={14} />
                <span>Send an Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MY CRAFT & TRADITIONS ── */}
      <section className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
          <Palette size={22} className="text-terracotta" />
          <div>
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('portfolio.myCraft')}
            </h2>
            <p className="text-xs font-sans text-brown/60">
              {language === 'hi' ? 'पीढ़ियों से मिली पवित्र सामग्री, पारंपरिक औज़ार और लोक विधियां' : 'The sacred materials, tools, and folk methods passed down to me'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Natural Materials */}
          <div className="p-5 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <h3 className="font-serif font-bold text-brown text-base mb-2 flex items-center gap-2">
              <Feather size={15} className="text-terracotta" />
              <span>Natural Materials</span>
            </h3>
            <p className="text-xs font-sans text-brown/75 leading-relaxed">
              {portfolio.materialsUsed}
            </p>
          </div>

          {/* Time & Practice */}
          <div className="p-5 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <h3 className="font-serif font-bold text-brown text-base mb-2 flex items-center gap-2">
              <Calendar size={15} className="text-forest" />
              <span>My Practice</span>
            </h3>
            <p className="text-xs font-sans text-brown/75 leading-relaxed">
              {portfolio.howLongPracticing ||
                'Practicing with daily devotion in our household art sanctuary.'}
            </p>
          </div>

          {/* Languages Spoken */}
          <div className="p-5 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <h3 className="font-serif font-bold text-brown text-base mb-2 flex items-center gap-2">
              <BookOpen size={15} className="text-ochre-dark" />
              <span>Languages I Speak</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {portfolio.spokenLanguages.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-lg bg-ivory border border-beige-dark/60 text-xs font-sans text-brown"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-[11px] font-sans text-brown/55 mt-2">
              Feel free to message me in whichever language you feel most comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. MY STORY (GUIDED MEMORIES & VOICE) ── */}
      <section className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
          <BookOpen size={22} className="text-terracotta" />
          <div>
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('portfolio.myStory')}
            </h2>
            <p className="text-xs font-sans text-brown/60">
              {language === 'hi' ? 'वे स्मृतियाँ, शिक्षक और प्रेरणाएँ जो मेरी तूलिका का मार्गदर्शन करती हैं' : 'The memories, teachers, and inspirations that guide my brush'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* How I Learned & Who Taught Me */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-brown text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>{language === 'hi' ? 'मैंने अपना शिल्प कैसे सीखा' : 'How I Learned My Craft'}</span>
            </h3>
            <p className="font-serif text-brown/85 text-sm sm:text-base leading-relaxed text-justify">
              {portfolio.learningStory}
            </p>
          </div>

          {/* What Inspires My Creations */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-brown text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>{language === 'hi' ? 'मेरी रचनाओं की प्रेरणा' : 'What Inspires My Creations'}</span>
            </h3>
            <p className="font-serif text-brown/85 text-sm sm:text-base leading-relaxed text-justify">
              {portfolio.inspirationStory}
            </p>
          </div>

          {/* What Makes This Work Special */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-ochre/15 border border-ochre/35">
            <h3 className="font-serif font-bold text-brown text-lg mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-terracotta" />
              <span>{language === 'hi' ? 'मेरी कला को क्या विशेष बनाता है' : 'What Makes My Work Special'}</span>
            </h3>
            <p className="font-serif italic text-brown/85 text-sm sm:text-base leading-relaxed">
              &ldquo;{portfolio.whatMakesItSpecial}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED CREATIONS GALLERY ── */}
      <section className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-beige-dark/50">
          <div>
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('portfolio.featuredCreations')}
            </h2>
            <p className="text-xs font-sans text-brown/60">
              {language === 'hi' ? 'मेरी कार्यशाला से सीधे उपलब्ध हस्तनिर्मित पारंपरिक रचनाएं' : 'Handmade artworks preserved and available directly from my studio'}
            </p>
          </div>

          <span className="text-xs font-sans text-brown/60">
            {displayArtworks.length} {language === 'hi' ? 'रचनाएं प्रदर्शित' : 'Masterpieces Showcased'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayArtworks.map((art) => (
            <div
              key={art.id}
              className="group bg-beige/30 rounded-2xl border border-beige-dark/60 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Framed Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-brown/10 border-b border-beige-dark/50">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-ivory/95 text-brown border border-beige-dark/60 shadow-sm">
                      {art.artForm}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-brown text-xl mb-1">
                    {art.title}
                  </h3>
                  <p className="text-xs font-sans text-brown/60 mb-3">
                    {art.artForm} · {art.type} · Traditional Mineral Dyes
                  </p>
                  <p className="font-sans text-xs text-brown/75 leading-relaxed line-clamp-3 mb-4">
                    {art.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenInquiry(art)}
                  className="w-full py-2.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send size={13} className="text-terracotta" />
                  <span>{language === 'hi' ? 'इस कलाकृति के बारे में पूछें' : 'Inquire About This Piece'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. OPTIONAL JOURNEY & COMMUNITY MILESTONES ── */}
      {portfolio.journeyMilestones && portfolio.journeyMilestones.length > 0 && (
        <section className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
            <Calendar size={22} className="text-terracotta" />
            <div>
              <h2 className="font-serif font-bold text-brown text-2xl">
                {language === 'hi' ? 'मेरी यात्रा और सामुदायिक मेले' : 'My Journey & Community Gatherings'}
              </h2>
              <p className="text-xs font-sans text-brown/60">
                {language === 'hi' ? 'लोक मेले, सामुदायिक कार्यशालाएं और शिल्प सभाएं' : 'Folk fairs, community workshops, and regional craft gatherings'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {portfolio.journeyMilestones.map((m) => (
              <div
                key={m.id || m.title}
                className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <div className="w-16 h-8 rounded-lg bg-terracotta/10 text-terracotta font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {m.year}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-brown text-base mb-1">
                    {m.title}
                  </h3>
                  <p className="text-xs font-sans text-brown/75 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. DIRECT CONTACT & INQUIRY SECTION ── */}
      <section className="bg-beige/60 rounded-3xl border-2 border-ochre/40 p-6 sm:p-10 text-center">
        <LotusLogo size={32} className="mx-auto mb-3" />
        <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl mb-2">
          {language === 'hi' ? `${portfolio.artisanName} से सीधा संपर्क करें` : `Connect Directly with ${portfolio.artisanName}`}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-brown/70 max-w-md mx-auto mb-6 leading-relaxed">
          {language === 'hi'
            ? 'पारंपरिक भारतीय शिल्पकारों का सीधे समर्थन करें। मौजूदा कलाकृति के बारे में पूछें, विशेष कलाकृति का अनुरोध करें, या प्रदर्शनियों के लिए आमंत्रित करें।'
            : 'Support traditional Indian artisans directly. Inquire about existing artwork, request a custom piece, or invite the artisan for cultural exhibitions.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {portfolio.whatsappNumber && (
            <a
              href={`https://wa.me/${portfolio.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>{language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
            </a>
          )}

          <button
            onClick={() => onOpenInquiry()}
            className="px-6 py-2.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors shadow-sm flex items-center gap-2"
          >
            <Mail size={15} className="text-terracotta" />
            <span>{language === 'hi' ? 'ईमेल संदेश भेजें' : 'Send Email Message'}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
