import React from 'react';
import '@fontsource/rock-salt';
import '@fontsource/caveat';
import { useTranslation } from 'react-i18next';

export default function HomeVideoPreview() {
  const { t } = useTranslation()

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/jTXmNSfnnds?autoplay=1&mute=1&controls=0&loop=1&playlist=jTXmNSfnnds&modestbranding=1&showinfo=0"
          title="Memorial Tribute Video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-black/50 to-transparent z-10"></div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-6 text-white text-left max-w-5xl mx-auto">
        <h1
          className="text-l md:text-l mb-4 leading-tight"
          style={{
            fontFamily: "'Rock Salt', cursive",
            backgroundColor: 'rgba(255, 247, 230, 0.65)',
            color: '#202020',
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {t("A Tribute Through Film")}
        </h1>
        <p
          className="text-l mt-2 max-w-xl"
          style={{
            fontFamily: "'Caveat', cursive",
            backgroundColor: 'rgba(255, 247, 230, 0.4)',
            color: '#333',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '1px 1px 6px rgba(0,0,0,0.1)',
          }}
        >
          {t("Watch this heartfelt video that commemorates the lives lost in the Tigray War — their voices echo through our memories.")}
        </p>
      </div>
    </section>
  );
}
