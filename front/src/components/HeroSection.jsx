import React, { useEffect, useState } from 'react';
import '@fontsource/rock-salt'; // Artistic handwritten font
import '@fontsource/caveat';    // Optional for subtitle
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const images = ['/1.png', '/2.png', '/3.png'];

const styles = {
  textWrapper: {
    display: 'block',
    width: '100%',
    backgroundImage: "url('/brush.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    padding: '1.25rem 2rem',
    borderRadius: '1rem',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontFamily: "'Rock Salt', cursive",
    fontSize: '2.5rem',
    fontWeight: 'bolder',
    color: '#e1e1e1',
    textShadow: "2px 2px 20px #1a1a1a"
  },
  heroSubtitle: {
    fontFamily: "'Caveat', cursive",
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#e2e2e2',
  },
  heroParagraph: {
    backgroundColor: '#3b3b3b77',
    padding: '1rem',
    borderRadius: '0.75rem',
    fontStyle: 'italic',
    color: '#fff7e6',
    maxWidth: '40rem',
    margin: '0 auto 2rem',
    boxShadow: '1px 1px 6px #3b3b3b',
  },
};


export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[450px] my-8 flex items-center justify-center bg-memorial-dark text-white overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000"
        style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div style={styles.textWrapper}>
          <div style={styles.heroTitle}>{t('Honoring the Lives of Tigrians')}</div>
        </div>

        <div style={styles.textWrapper}>
          <h2 className="animate-fadeIn delay-100" style={styles.heroSubtitle}>
            {t("Lost in the Tigray War")}
          </h2>
        </div>

        <p className="animate-fadeIn delay-200" style={styles.heroParagraph}>
          A tribute to the bright friends taken too soon—may their legacy inspire future generations.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 animate-fadeIn delay-300">
          <Link
            to="/our-heroes"
            className="px-6 py-3 shadow shadow-gray-600 bg-red-700 hover:bg-red-500 rounded-lg transition text-white font-semibold"
          >
            View Memorial
          </Link>
          <a
            href="https://donateme/donate"
            className="px-6 py-3 shadow shadow-gray-600 bg-[#505050] hover:bg-[#7e7e7e] rounded-lg transition text-white font-semibold"
          >
            Donate Now
          </a>
        </div>
      </div>
    </section>
  );
}
