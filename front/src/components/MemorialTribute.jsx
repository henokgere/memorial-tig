import { useTranslation } from "react-i18next";

export default function MemorialTribute() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-[#D62828] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-12">
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-memorial-light rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-memorial-light">
            {t("Gone But Never Forgotten")}
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-memorial-light rounded-full"></div>
        </div>

        <div className="relative">
          {/* Left quote mark */}
          <span className="absolute -left-8 -top-4 text-6xl text-memorial-light opacity-30">
            “
          </span>

          <p className="text-lg md:text-xl leading-relaxed mb-8 italic">
            {t(
              "We remember the bright young minds whose lives were tragically cut short, their dreams left unfulfilled, Though they are no longer with us, their legacy of hope, ambition, and resilience will live on in the hearts of those who knew them and the generations they continue to inspire."
            )}
          </p>

          {/* Right quote mark */}
          <span className="absolute -right-8 -bottom-4 text-6xl text-memorial-light opacity-30">
            ”
          </span>
        </div>

        {/* Candle icon */}
        <div className="mt-12 text-yellow-400 flex justify-center">
          <svg
            className="w-12 h-12 text-memorial-light animate-flicker"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm-3 7a3 3 0 016 0v5a1 1 0 01-1 1H8a1 1 0 01-1-1V9z"
              clipRule="evenodd"
            />
            <path d="M10 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
          </svg>
        </div>
        {/* Donation CTA */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">
            {t("Support Our Mission")}
          </h3>
          <p className="text-sm">
            {t(
              "Your contribution helps preserve the memory of those we've lost."
            )}
          </p>      
        </div>
      </div>
    </section>
  );
}
