import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-gray-800 text-gray-200 shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-semibold tracking-wide">
          {t("TMMA")}
        </div>

        {/* Right-side content */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <span>{t("Welcome")}</span>
          <a
            href="https://donateme/donate"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-200 shadow-sm"
          >
            {t("Donate Now")}
          </a>
        </div>

        {/* Future Auth Links (Optional) */}
        {/* 
        <div className="flex space-x-4 text-sm">
          <Link to="/login" className="hover:underline">
            {t('Login')}
          </Link>
          <Link to="/register" className="hover:underline">
            {t('Register')}
          </Link>
        </div> 
        */}
      </div>
    </header>
  );
}
